# Pure Funktionen

## Schmutzige Funktion

```js
function stupid (n) {
  document.write(n)
  return n * window.m
}
```

## Pure Funktion

```js
function smart (n, m) {
  return n * m
}
```

<notes>

Pure Funktionen müssen zwei Regeln entsprechen.

1) Die Funktion darf keine side-effects haben
2) Eine Funktion muss mit den **gleichen Parametern** immer den **gleichen Rückgabewert** haben.

Die Funktion `stupid` ist ein sehr einfaches Beispiel für eine unpure Funktion. Sie verstösst gegen beide Regeln. Erstens macht Sie `document.write(n)`. Das ist ein side-effect. Das heisst die Funktion macht etwas, dass nicht am Rückgabewert erkennbar ist. Zweitens holt sie `m` aus dem **globalen scope** (`window.m`) und multipliziert die Zahl mit dem Parameter `n`. Während der Laufzeit des Programms kann sich bei `stupid` die Zahl `m` und damit der Rückgabewert, jeder Zeit ändern.

`smart` hingegen gibt mit den gleichen Parametern immer den gleichen Rückgabewert und das ganze ohne side-effect.

DOM manipulationen sind inherent unpur. Elm hat dafür eine interessante Lösung. Darauf werde ich aber nicht eingehen.

</notes>


