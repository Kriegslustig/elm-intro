module Lib.HackerNews where

import Http
import Result exposing (withDefault)
import Signal exposing (Address)
import Task exposing (..)
import Json.Decode exposing ((:=))
import Effects exposing (..)
import Debug

getNews : (List String -> a) -> Effects a
getNews a =
  getNewsTask
    |> toResult
    |> Task.map (\res -> a (withDefault [] res))
    |> Effects.task

getNewsTask : Task Http.Error (List String)
getNewsTask =
  Http.get decodeNewsList ("/hnposts")

decodeNewsList : Json.Decode.Decoder (List String)
decodeNewsList =
  Json.Decode.list Json.Decode.string

