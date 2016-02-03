# Signals

<div class="signal"></div>

```elm
main =
  Signal.map
    text
    keypresses
```

<notes>

Hier ein einfaches Beispiel mit Singals. Das Programm zeigt immer die zuletzt gedrückte Taste an. `main` ist eine Funktion die ausgeführt wird, wenn das Programm startet. `Signal.map` ist eine Funktion die Signale konvertiert. In diesem Fall ist der **_Converter_**, `text`. `text` nimmt einen `String` und gibt einen Wert vom Typ `Html` zurück. Das Signal `keypresses`, feuert immer wenn eine Taste gedrückt wird, und gibt diese dann als string aus.

Man kann sich Signale wie die obige Animation vorstellen. Signale sind JavaScript Events sehr ähnlich.

Diese Funktion ist im gegensatz zum JavaScript equivalent pur funktional.

</notes>

