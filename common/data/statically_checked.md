# Statisch überprüft

```elm
addOne : Int -> Int
addOne n = 1 + n
```

```elm
addOne "2"
-- Compiler error
```

<notes>

Wenn wir unser Funktion `addOne`, `"2"` als String mitgeben, wird der Compiler einen Fehler ausgeben. Die typen Signatur (`addOne : Int -> Int`) ist optional. Sie macht aber den code um einiges leserlicher und etwas Fehler-resistenter. Der compiler überprüft nämlich ob die Signatur mit der Funktionsdefinition übereinstimmt. Der Elm compiler ist sehr gut im ableiten von Typen. Im oberen einfachen Beispiel, bedeutet das, dass der compiler weiss, dass `1 + n` einen Integer zurück gibt.

</notes>

