# Virtual DOM

<div class="virtualdom" onclick="this.setAttribute('class', this.getAttribute('class') + ' active')" >
  <div class="virtualdom__col virtualdom__col--1">
    <h2 class="virtualdom__title">DOM</h2>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--1">
    <h2 class="virtualdom__title">DOM</h2>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--2">
    <h2 class="virtualdom__title">Diff</h2>
    <div class="virtualdom__brick virtualdom__brick--white"></div>
    <div class="virtualdom__brick virtualdom__brick--white"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--white"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--2">
    <h2 class="virtualdom__title">Cache</h2>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--3">
    <h2 class="virtualdom__title">Interface</h2>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--3">
    <h2 class="virtualdom__title">Interface</h2>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
    <div class="virtualdom__brick virtualdom__brick--colorful"></div>
    <div class="virtualdom__brick"></div>
  </div>
  <div class="virtualdom__col virtualdom__col--3">
  </div>
  <div class="virtualdom__col virtualdom__col--2">
  </div>
  <div class="virtualdom__col virtualdom__col--1">
  </div>
</div>

<notes>

Meine Library **r.js** ist sehr ineffizient. Sie rendert einfach die ganze Seite neu und macht alle Berechnungen jedes mal wenn sich eine Variable verändert (Mehr oder weniger). Bei unserem einfachen Beispiel funktioniert das zielmlich gut. Bei komplexeren Dokumenten ist das aber nicht so leicht möglich. Jedes mal, wenn sich was verändert, das ganze Dokument zu rendern ist einfach zu langsam. Virtual DOM abstrahiert den normalen DOM. Wenn eine Änderung geschiet, vergleicht Virtual DOM den neusten Stand mit dem aktuellen. Basierend darauf ermittelt es die **wenigstem möglichen Schritte** um ans Ziel zu kommen.

</notes>

