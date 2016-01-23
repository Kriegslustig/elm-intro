'use strict';

var Elm = window.Elm;

var mapElems = function mapElems(className, cb) {
  return [].map.call(document.getElementsByClassName(className), cb);
};

var presentation = Elm.fullscreen(Elm.Presentation);(function (_) {
  var ran = false;
  presentation.ports.newSlides.subscribe(function (slides) {
    if (ran) return;
    setTimeout(function (_) {
      mapElems('searchExample', function (el) {
        Elm.embed(Elm.SearchExample, el);
      });
    }, 100); // Wait for view to update
    ran = true;
  });
})();
