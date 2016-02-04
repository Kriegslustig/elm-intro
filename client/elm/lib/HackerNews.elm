module Lib.HackerNews where

import Http
import Result exposing (withDefault)
import Signal exposing (Address)
import Task exposing (..)
import Json.Decode exposing ((:=))
import Effects exposing (..)
import Debug

type alias NewsArticle =
  { title : String
  , id : Int
  }

getNews : (List NewsArticle -> a) -> Effects a
getNews a =
  getNewsTask
    |> toResult
    |> Task.map (\res -> withDefault [] res
      |> List.drop 4000
      |> a
    )
    |> Effects.task

getNewsTask : Task Http.Error (List NewsArticle)
getNewsTask =
  Http.get decodeNewsList "elm/hnposts"

decodeNewsArticle : Json.Decode.Decoder NewsArticle
decodeNewsArticle =
  Json.Decode.object2 NewsArticle
    ( Json.Decode.oneOf
      [ ("title" := Json.Decode.string)
      , ("text" := Json.Decode.string)
      , ("type" := Json.Decode.string)
      ]
    )
    ("id" := Json.Decode.int)

decodeNewsList : Json.Decode.Decoder (List NewsArticle)
decodeNewsList =
  Json.Decode.list decodeNewsArticle

