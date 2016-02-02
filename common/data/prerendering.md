# Prerendering

<svg version="1.1" class="achtitecture" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve">
<style type="text/css">
  .achtitecture .st0{fill:none;stroke:#000000;stroke-width:3;stroke-miterlimit:10;}
  .achtitecture .st2{font-size:20px;}
  .achtitecture .st3{fill:none;stroke:#59947E;stroke-width:3;stroke-miterlimit:10;}
  .achtitecture .st4{fill:#59947E;}
</style>
<line class="st0" x1="250" y1="41.3" x2="250" y2="449.2"/>
<rect x="38.6" y="62.8" class="st0" width="146.4" height="165.6"/>
<rect x="301.5" y="62.8" class="st0" width="146.4" height="338.9"/>
<rect x="46.9" y="73.1" class="st0" width="129.8" height="40.4"/>
<text transform="matrix(1 0 0 1 83.7545 101.556)" class="st1 st2">HTML</text>
<text transform="matrix(1 0 0 1 327.7326 237.6091)" class="st1 st2">Browser</text>
<rect x="46.9" y="123.4" class="st0" width="129.8" height="40.4"/>
<text transform="matrix(1 0 0 1 97.7633 151.8871)" class="st1 st2">JS</text>
<rect x="46.9" y="175.1" class="st0" width="129.8" height="40.4"/>
<text transform="matrix(1 0 0 1 89.4996 203.5427)" class="st1 st2">CSS</text>
<rect x="24.5" y="277.9" class="st0" width="168" height="87.1"/>
<text transform="matrix(1 0 0 1 38.1183 329.0791)" class="st1 st2">/posts.json</text>
<g>
  <g>
    <line class="st3" x1="186.4" y1="135.3" x2="296.4" y2="135.3"/>
    <g>
      <polygon class="st4" points="286.5,147.6 284.4,145.4 295.3,135.3 284.4,125.3 286.5,123.1 299.7,135.3       "/>
    </g>
  </g>
</g>
<g>
  <g>
    <line class="st3" x1="299.7" y1="298.1" x2="197.8" y2="298.1"/>
    <g>
      <polygon class="st4" points="207.7,285.9 209.7,288.1 198.9,298.1 209.7,308.2 207.7,310.4 194.5,298.1       "/>
    </g>
  </g>
</g>
<g>
  <g>
    <line class="st3" x1="194.5" y1="339.5" x2="296.4" y2="339.5"/>
    <g>
      <polygon class="st4" points="286.5,351.8 284.4,349.6 295.3,339.5 284.4,329.4 286.5,327.2 299.7,339.5       "/>
    </g>
  </g>
</g>
</svg>

<notes>

Hier nochmals die Grafik von Folie 2. Wie bereits gesagt gibt es mit **client-side rendering** ein Problem. [Der Google Crawler interpretiert JavaScript wie ein normaler Browser](https://googlewebmastercentral.blogspot.ch/2015/10/deprecating-our-ajax-crawling-scheme.html). Grundsätzlich kann das auch der Bingbot. Man sollte einfach [diesen Guidelines](http://stackoverflow.com/a/1785101/4386702) folgen. Das ganze ist jedoch etwas undurchsichtig.

Es gibt das Theoretisch ist es sehr leicht Seiten mit JavaScript Server-Side zu rendern. Jedoch hat Server-Side rendering implikationen für das Caching. Das macht es wieder komplexer. Deshalb gibt es Dienste wie [prerender.io](https://prerender.io/), die mit Open-Source Software SPAs rendern.

</notes>

