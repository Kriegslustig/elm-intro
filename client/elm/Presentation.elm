module Presentation where

import Signal exposing (Address, map, merge)
import Keyboard
import Maybe exposing (Maybe(Just, Nothing))
import List exposing ((::))
import Html exposing (Html, div, h1, article, fromElement, text, p)
import Html.Attributes exposing (style, class)
import Html.Events exposing (onKeyDown)
import Markdown
import Effects exposing (Effects)
import Http
import Json.Decode exposing ((:=))
import Task exposing (Task)
import StartApp

import Debug

(=>) = (,)

type alias Model =
  { slide : Int
  , slides : List Slide
  , showNotes : Bool
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
      , Effects.none
      )

    PrevSlide ->
      ( { model |
          slide = model.slide-1
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

getSlides : String -> Effects Action
getSlides url =
  Http.get slidesDecoder url
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
        else NoOp
    )
    keyDown

renderSlide : Bool -> Slide -> Html
renderSlide notes slide =
  article
    [ class "slide"
    , style
      [ "width" => "100vw"
      , "height" => "100vh"
      , "display" => "inline-block"
      , "vertical-align" => "top"
      , "white-space" => "normal"
      ]
    ]
    [ h1
      [ ]
      [ text slide.title ]
    , div
      [ class "slide__content" ]
      [ fromElement <| Markdown.toElement slide.content ]
    , div
      [ class "slide__notes"
      , style [ "display" =>
          if notes
             then "block"
             else "none"
        ]
      ]
      [ fromElement <| Markdown.toElement slide.notes ]
    ]

translateX : Int -> String
translateX i =
  "translateX(" ++ toString i ++ "vw)"

init : (Model, Effects Action)
init =
  ( { slide = 0
    , slides = []
    , showNotes = False
    }
  , getSlides "/slides"
  )

view : Address Action -> Model -> Html
view address model =
  div
    []
    [ div
      [ style
          [ "position" => "absolute"
          , "white-space" => "nowrap"
          , "transform" => translateX (negate (model.slide * 100))
          , "height" => "100vh"
          ]
      ]
      <| List.map (renderSlide model.showNotes) model.slides
    , p
      [ style
        [ "position" => "fixed"
        , "bottom" => "0"
        , "left" => "0"
        ]
      ]
      [ text <| toString model.slide ]
    ]

app =
  StartApp.start
    { init = init
    , view = view
    , update = update
    , inputs = [keySignal]
    }

main : Signal Html
main =
  app.html

port tasks : Signal (Task Effects.Never ())
port tasks =
  app.tasks

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

