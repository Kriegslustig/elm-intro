# Funktionale Programmierung

<notes>

Funktionale Programmierung heisst nicht mehr als **programmieren mit Funktionen**. Es gibt **keine Klassen**. Ich kann das nicht besser erklären als [Norman Ramsey](https://stackoverflow.com/users/41661/norman-ramsey) in [seiner Antwort](http://stackoverflow.com/a/2079678/4386702) auf [diese Stackoverflow Frage](https://stackoverflow.com/questions/2078978/functional-programming-vs-object-oriented-programming).

_Norman Ramsey_:

> When do you choose functional programming over object oriented?

When you anticipate a different kind of software evolution:

  - Object-oriented languages are good when you have a fixed set of *operations* on *things*, and as your code evolves, you primarily add new things.  This can be accomplished by adding new classes which implement existing methods, and the existing classes are left alone.

  - Functional languages are good when you have a fixed set of  *things*, and as your code evolves, you primarily add new *operations* on existing things. This can be accomplished by adding new functions which compute with existing data types, and the existing functions are left alone.

When evolution goes the wrong way, you have problems:

  - Adding a new operation to an object-oriented program may require editing many class definitions to add a new method.

  - Adding a new kind of thing to a functional program may require editing many function definitions to add a new case.

This problem has been well known for many years; in 1998, [Phil Wadler dubbed it the "expression problem"](http://www.daimi.au.dk/~madst/tool/papers/expression.txt).  Although some researchers think that the expression problem can be addressed with such language features as mixins, a widely accepted solution has yet to hit the mainstream.

> What are the typical problem definitions where functional programming is a better choice?

Functional languages excel at manipulating symbolic data in tree form.  A&nbsp;favorite example is compilers, where source and intermediate languages change seldom (mostly the same *things*), but compiler writers are always adding new translations and code improvements or optimizations (new operations on things).  Compilation and translation more generally are "killer apps" for functional languages.

</notes>

