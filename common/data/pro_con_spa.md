# SPA Architektur

## Nachteile

1. Crawler/No-Script Browser (prerender.io)
2. Initial Render Time

## Vorteile

1. Server-Side Caching
2. Scalabillity
3. Mehr Entwickler
4. Bessere Tools
5. Schnellere Entwicklung

<notes>

In dieser Architektur wir also eigentlich alles durch JavaScript gerendered und die Informationen werden aus der **Database über JSON APIs** geholt. Das hat einige Vorteile gegenüber einer traditionelleren Architektur.

1. **Server-Side Caching** - Die drei Files die zuerst ausgeliefert werden können perfekt gecached werden. Die APIs können einfach hinter einen Mem-Cache gestellt werden. Dieses Caching kann man extrem gut fine tunen, da man eine saubere Trennung der verschiedenen dynamischen Inhalte bekommt.
2. **Bessere Scalability** - Das Client-Side rendering erlaubt es einem Microservices ohne Load-Balancer auf komplett getrennten Servern zu haben. Man kann diese nämlich einfach von unterschiedlichen URLs/Domains holen.
3. **Mehr Developer** - JavaScript [ist eine der populärsten Programmierspachen](http://githut.info/) es ist also leichter quallifizierte Programmierer zu finden. Das hat natürlich auch zur Folge das sich Systeme schneller entwickeln.
4. **Schnellere Entwicklung** - Wenn man Client-Side rendert, ist selbst auf Windows ein lokaler Workflow leicht zu konfigurieren. So kann man die latenz eines Test-Servers vermeiden. Ebenfalls kann man den ganzen overhead vermeiden.

Natürlich hat diese Architektur auch einige Nachteile.

1. **SEO (Crawler)/No-Script Browser** - In No-Script Browsern wird nicht gerendered. Viele Bots führen heute JavaScript aus. Ich werde später noch tiefer darauf eingehen.
2. **Browser Support** - Dieser _Nachteil_ lässt sich mit gutem Tooling ([Babel](https://babeljs.io/) usw.) komplett vermeiden.
3. **Initial Render Time** - Die Lösung für dieses Problem hängt stark mit der für Punkt eins zusammen. Auch darauf werde ich später eingehen.

Wie bereits gesagt gibt es mit **client-side rendering** ein Problem. [Der Google Crawler interpretiert JavaScript wie ein normaler Browser](https://googlewebmastercentral.blogspot.ch/2015/10/deprecating-our-ajax-crawling-scheme.html). Grundsätzlich kann das auch der Bingbot. Man sollte einfach [diesen Guidelines](http://stackoverflow.com/a/1785101/4386702) folgen. Das ganze ist jedoch etwas undurchsichtig.

Es gibt das Theoretisch ist es sehr leicht Seiten mit JavaScript Server-Side zu rendern. Jedoch hat Server-Side rendering implikationen für das Caching. Das macht es wieder komplexer. Deshalb gibt es Dienste wie [prerender.io](https://prerender.io/), die mit Open-Source Software SPAs rendern.

</notes>

