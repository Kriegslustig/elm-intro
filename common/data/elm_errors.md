# Errors

```elm
foo =
  Result.withDefault 0 bar
```

<notes>

Neben der **puren funktionalität** und dem **starken statischen typen system**, gibt es noch ein weiteren wichtigen Faktor für Elms Fehlerresistenz. Alle funktionen, von denen der Compiler sich nicht absolut sicher sein kann, dass sie erfolgreich sein werden, müssen ein `Result` zurückgeben

</notes>

