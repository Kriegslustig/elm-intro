module SearchExample where

import Signal
import String exposing (contains, toLower)
import Html exposing (..)
import Html.Attributes exposing (type', style, placeholder)
import Html.Events exposing (on, targetValue)
import Http
import Effects exposing (Effects, none)
import StartApp
import Task exposing (Task)

import Lib.HackerNews as HackerNews

type alias Model =
  { output : List HackerNews.NewsArticle
  , inList : List HackerNews.NewsArticle
  }

type Action = NoOp
  | NewQuery String
  | NewInput (List HackerNews.NewsArticle)

query : List HackerNews.NewsArticle -> String -> List HackerNews.NewsArticle
query list string =
  List.filter (contains (toLower string) << toLower << .title) list

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
        , output = input
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
      , placeholder "Gib hier Text ein..."
      ]
      []
    , p [] [ text <| "Resultate: " ++ toString (List.length model.output) ]
    , ul
      [ style [ ("width", "100%") ] ]
      <| List.map (li [] << flip (::) [] << text << .title) model.output
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

