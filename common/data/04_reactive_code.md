# Beispiel Reactive Code

## Template

```html
<p>{{ square }}</p>
```

## JS

```js
r.n = ''

r(() => {
  render({ square: r.n })
})

$('input').on('change', (t, e) => {
  r.n = Number(t.value)
})
```

<notes>
Hier sehr simples Beispiel das mit einem selbst geschriebenen _Reactive Framework_ gemacht wurde. Zuerst wird mit `r('')` eine reaktive Variabel initialisiert. Der leere String der mitgegeben wird ist der default Wert. Diese Variablen sind [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)s. Wenn `r` eine Funktion mitgegeben wird, passiert folgendes:

* Es wird ein listener auf alle `Proxy.handler.get` gesetzt.
* Die Funktion wird ausgeführt
* `r` speicher alle reaktive Variablen in einem hash (`reactiveVar: [<function>]`)

Danach warten wir mit `setTimeout` eine Sekunde und ändern dann test. Jetzt triggert `Proxy.handler.set`. `r` hat sich beim letzten mal als es die obere Funktion (die `render`) ausführt gemerkt, dass die Funktion von `reactiveVar` abhängt. Jetzt geht `r` also den hash der Abhängigkeiten durch und sieht unsere Funktion. Also ruft `r` sie nochmals auf.

</notes>

