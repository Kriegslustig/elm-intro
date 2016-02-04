module Presentation where

import Signal exposing (Address, map, merge, Mailbox, mailbox)
import String
import Keyboard
import Maybe exposing (Maybe(Just, Nothing))
import List exposing ((::))
import Html exposing (Html, div, h1, article, fromElement, text, p, a)
import Html.Attributes exposing (style, class, attribute, href)
import Html.Events exposing (onKeyDown, onClick)
import Markdown
import Effects exposing (Effects)
import Http
import Json.Decode exposing ((:=))
import Task exposing (Task)
import StartApp
import History

import Debug

(=>) = (,)

type alias Model =
  { slide : Int
  , slides : List Slide
  , showNotes : Bool
  , zoom : Float
  }

type alias Slide =
  { title : String
  , content : String
  , notes : String
  }

type Action = NoOp
  | PrevSlide
  | NextSlide
  | ToggleNotes
  | ToggleZoom
  | SetSlide Int
  | SetSlideAndZoom Int
  | AddSlides (Maybe (List Slide))

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NoOp ->
      ( model
      , Effects.none
      )

    NextSlide ->
      ( { model |
          slide = model.slide+1
        }
      , setSlideHash <| model.slide+1
      )

    PrevSlide ->
      ( { model |
          slide = model.slide-1
        }
      , setSlideHash <| model.slide-1
      )

    SetSlide slide ->
      ( { model |
          slide = slide
        }
      , Effects.none
      )

    SetSlideAndZoom slide ->
      ( { model |
          slide = slide
        , zoom = 1
        }
      , Effects.none
      )

    AddSlides maybeSlides ->
      ( { model |
          slides = model.slides ++ (Maybe.withDefault [] maybeSlides)
        }
      , Effects.none
      )

    ToggleNotes ->
      ( { model |
          showNotes = not model.showNotes
        }
      , Effects.none
      )

    ToggleZoom ->
      ( { model |
          zoom = if model.zoom < 1 then 1 else 0.25
        }
      , Effects.none
      )

setSlideHash : Int -> Effects Action
setSlideHash slide =
  Effects.batch
    [ toString slide
      |> (++) "/#"
      |> History.setPath
      |> Task.toResult
      |> Task.map (\res -> NoOp)
      |> Effects.task
    , Signal.send slideMailbox.address slide
      |> Task.toResult
      |> Task.map (\res -> NoOp)
      |> Effects.task
    ]

storeInSig : Signal Action
storeInSig =
  Signal.map SetSlide storeIn

getSlides : String -> Effects Action
getSlides url =
  Http.get slidesDecoder url `Task.onError` (\e ->
      let e = Debug.log "" e
      in Task.succeed []
    )
    |> Task.toMaybe
    |> Task.map AddSlides
    |> Effects.task

slidesDecoder : Json.Decode.Decoder (List Slide)
slidesDecoder =
  Json.Decode.list
    <| Json.Decode.object3 Slide
      ("title" := Json.Decode.string)
      ("content" := Json.Decode.string)
      ("notes" := Json.Decode.string)

port keyDown : Signal Int
port initHashSignal : String

keySignal : Signal Action
keySignal =
  map
    ( \key ->
      if key == 39
        then NextSlide
      else if key == 37
        then PrevSlide
      else if key == 78
        then ToggleNotes
      else if key == 90
        then ToggleZoom
        else NoOp
    )
    keyDown

parseHash : String -> Int
parseHash =
  Result.withDefault 0
  << String.toInt
  << String.dropLeft 1

hashSignal : Signal Action
hashSignal =
  map
    (SetSlide << parseHash)
    History.hash

renderSlide : Bool -> Bool -> Address Action -> Int -> Slide -> Html
renderSlide notes zoom address i slide =
  article
    [ class "slide"
    , attribute "data-title" slide.title
    , style
      [ "width" => "calc(100vw - 15px)"
      , "min-height" => "100vh"
      , "vertical-align" => "top"
      , "white-space" => "normal"
      , "position" => "relative"
      ]
    ]
    [ Markdown.toHtml ("#" ++ slide.title)
    , div
      [ class "slide__content" ]
      [ Markdown.toHtml slide.content ]
    , div
      [ class "slide__notes"
      , style
        [ "display" =>
          if notes
             then "block"
             else "none"
        ]
      ]
      [ Markdown.toHtml slide.notes ]
    , a
      [ style
        [ "width" => "100%"
        , "height" => "100vh"
        , "position" => "absolute"
        , "top" => "0"
        , "left" => "0"
        , "display" =>
          if zoom
             then "block"
             else "none"
        ]
      , onClick address (SetSlideAndZoom i)
      , href
        <| (++) "#"
        <| toString i
      ]
      []
    ]

translateX : Float -> String
translateX i =
  "translateX(" ++ toString i ++ "vw)"

init : (Model, Effects Action)
init =
  ( { slide = parseHash initHashSignal
    , slides = []
    , showNotes = False
    , zoom = 1
    }
  , getSlides "/slides"
  )

view : Address Action -> Model -> Html
view address model =
  let
    translate = translateX <| (toFloat model.slide) * 100 * -1
    scale = "scale(" ++ (toString model.zoom) ++ ")"
  in
    div
      [ class "deck__container"
      , style [ "transform" => scale ]
      ]
      [ div
        [ style
            [ "position" => "absolute"
            , "white-space" => "nowrap"
            , "transform" => translate
            , "height" => "100vh"
            ]
        , class "deck"
        ]
        <| List.indexedMap (renderSlide model.showNotes (model.zoom < 1) address) model.slides
      , div
        [ style
          [ "position" => "fixed"
          , "bottom" => "25px"
          , "left" => "25px"
          ]
        , class "page"
        ]
        [ text <| toString model.slide ]
      ]

app =
  StartApp.start
    { init = init
    , view = view
    , update = update
    , inputs = [hashSignal, keySignal, storeInSig]
    }

main : Signal Html
main =
  app.html

port tasks : Signal (Task Effects.Never ())
port tasks =
  app.tasks

slideMailbox : Mailbox Int
slideMailbox =
  mailbox (fst init).slide

port storeIn : Signal Int

port storeOut : Signal Int
port storeOut =
  slideMailbox.signal

port newSlides : Signal Int
port newSlides =
  Signal.filterMap
    (\model ->
      if List.length model.slides > 0
        then Just 1
      else Nothing
    )
    0
    app.model

