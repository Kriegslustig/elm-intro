module Presentation where

import Signal exposing (Address, Mailbox, mailbox, foldp, map, merge)
import Keyboard
import List
import Html exposing (Html, div, h1, article, fromElement, text, p)
import Html.Attributes exposing (style, class)
import Html.Events exposing (onKeyDown)
import Markdown
import Effects exposing (Effects)
import Http
import Task

type alias Model =
  { slide : Int
  }

type alias Slide =
  { title : String
  , content : String
  }

type Action = NoOp
  | PrevSlide
  | NextSlide

update : Action -> Model -> Model
update action model =
  case action of
    NoOp ->
      model

    NextSlide ->
      { model |
        slide = model.slide+1
      }

    PrevSlide ->
      { model |
        slide = model.slide-1
      }

-- Will later be dynamically retrieved from remote
slides : List Slide
slides =
  [ { title = "A first slide"
    , content = "## yolo"
    }
  ]

keySignal : Signal Action
keySignal =
  map
    ( \key ->
      if key == 39
        then NextSlide
      else if key == 37
        then PrevSlide
        else NoOp
    )
    Keyboard.presses

actions : Mailbox Action
actions =
  mailbox NoOp

init : Model
init =
  { slide = 0
  }

renderSlide : Int -> Slide -> Html
renderSlide i slide =
  article
    [ class "slide"
    , style
      [ ("width", "100vw")
      , ("height", "100vh")
      ]
    ]
    [ h1
      []
      [ text slide.title ]
    , div
      []
      [ fromElement <| Markdown.toElement slide.content ]
    ]

view : Address Action -> Model -> Html
view address model =
  div
    [ style
        [ ("position", "absolute")
        , ("left"
          , ( toString
              <| negate
              <| model.slide * 100
            ) ++ "vw"
          )
        , ("height", "100vh")
        ]
    ]
    <| List.indexedMap renderSlide slides
      ++
      [ p
        [ style
          [ ("position", "fixed")
          , ("bottom", "0")
          , ("left", "0")
          ]
        ]
        [ text <| toString model.slide ]
      ]

model : Signal Model
model =
  foldp update init (merge actions.signal keySignal)

-- port tasks =

main : Signal Html
main =
  map (view actions.address) model

