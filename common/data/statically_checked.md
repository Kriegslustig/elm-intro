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

Wenn wir unser Funktion `addOne`, `"2"` als String mitgeben, wird der Compiler einen Fehler ausgeben.

</notes>

