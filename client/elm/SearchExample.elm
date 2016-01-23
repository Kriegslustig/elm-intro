module SearchExample where

import Signal
import String exposing (contains, toLower)
import Html exposing (..)
import Html.Attributes exposing (type')
import Html.Events exposing (on, targetValue)
import Http
import Effects exposing (Effects, none)
import StartApp
import Task exposing (Task)

import HackerNews

type alias Model =
  { output : List String
  , inList : List String
  }

type Action = NoOp
  | NewQuery String
  | NewInput (List String)

query : List String -> String -> List String
query list string =
  List.filter (contains (toLower string) << toLower) list

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    NoOp ->
      (model, none)

    NewQuery inString ->
      ( { model |
          output = query model.inList inString
        }
      , none
      )

    NewInput input ->
      ( { model |
          inList = input
        }
      , none
      )

view : Signal.Address Action -> Model -> Html
view address model =
  div
    []
    [ input
      [ type' "text"
      , on "input" targetValue
        <| \query -> Signal.message address (NewQuery query)
      ]
      []
    , Html.p [] [ text "Search" ]
    , ul
      []
      <| List.map (li [] << flip (::) [] << text) model.output
    ]

init : (Model, Effects Action)
init =
  ( { inList = []
    , output = []
    }
  , HackerNews.getNews NewInput
  )

app =
  StartApp.start
    { update = update
    , view = view
    , init = init
    , inputs = []
    }

main =
  app.html

port tasks : Signal (Task Effects.Never ())
port tasks =
  app.tasks
