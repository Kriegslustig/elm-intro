# Beispiel Reactive Code

```js
// Einen initialen wert von number definieren
r.number = 0

// Rendert r.number im quadrat in einer reaktiven funktion
r(function () {
  render( r.number * r.number )
})

// Hört auf imput events und updated dann r.number
$('input').on('change', function (element) {
  r.number = Number(element.value)
})
```

<notes>
Hier sehr simples Beispiel das mit einem selbst geschriebenen _Reactive Micro Framework_ gemacht wurde. Zuerst wird mit `r.n = 0` ein reaktives attribut von `r` definiert. `r` hat einen [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler) als Prototyp. Mit `r()` wird eine reaktive funktion registriert. Dieser Prozess sieht ungefähr wie folgt aus:

* Es wird ein listener auf alle `r.__proto__.handler.get` gesetzt
* Die Funktion wird ausgeführt
* `r` speicher alle properties die während dem ausführen der Funktion verwendet werden
* Dann registriert es die variablen als abhängig von der Funktion

Danach warten wir mit `setTimeout` eine Sekunde und ändern dann test. Jetzt triggert `Proxy.handler.set`. `r` hat sich beim letzten mal als es die obere Funktion (die `render`) ausführt gemerkt, dass die Funktion von `reactiveVar` abhängt. Jetzt geht `r` also den hash der Abhängigkeiten durch und sieht unsere Funktion. Also ruft `r` sie nochmals auf.

</notes>

