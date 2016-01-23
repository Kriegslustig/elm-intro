module HackerNews where

import Http
import Result exposing (withDefault)
import Signal exposing (Address)
import Task exposing (..)
import Json.Decode exposing ((:=))
import Effects exposing (..)
import Debug

baseUrl = "https://hacker-news.firebaseio.com/v0/"

getNews : (List String -> a) -> Effects a
getNews a =
  getNewsTask
    |> toResult
    |> Task.map (\res -> a (withDefault [] (Debug.log "res" res)))
    |> Effects.task

getNewsTask : Task Http.Error (List String)
getNewsTask =
  Http.get decodeNewsList (baseUrl ++ "topstories.json")
    `andThen` (sequence << List.map getArticle)

getArticle : Int -> Task Http.Error String
getArticle id =
  Http.get decodeNewsArticle (baseUrl ++ "item/" ++ toString id ++ ".json")
    `onError` \err -> succeed ""

decodeNewsArticle : Json.Decode.Decoder String
decodeNewsArticle =
  "title" := Json.Decode.string

decodeNewsList : Json.Decode.Decoder (List Int)
decodeNewsList =
  Json.Decode.list Json.Decode.int

