const hljs = require('highlight.js')

const rExample = require('./lib/rExample')
const normalSearch = require('./lib/search')

const Elm = window.Elm

const mapElems = (className, cb) => [].map
  .call(
    document.getElementsByClassName(
      className
    ),
    cb
  )

const presentation = Elm.fullscreen(
  Elm.Presentation,
  {
    keyDown: 0,
    initHashSignal: location.hash,
    storeIn: 0
  }
)

window.addEventListener('scroll', e => {
  window.scroll(0, 0)
})

window.addEventListener('storage', e => {
  const slide = window.localStorage.slide
  if(!slide) return
  presentation.ports.storeIn.send(Number(slide))
})

presentation.ports.storeOut.subscribe(slide => {
  window.localStorage.slide = slide
})

window.addEventListener('keydown', e => {
  if(
    e.target.tagName === 'INPUT' ||
    e.metaKey === true
  ) return
  presentation.ports.keyDown.send(e.keyCode)
  e.preventDefault()
})

;(_ => {
  let ran = false
  presentation.ports.newSlides.subscribe(slides => {
    if(ran) return
    setTimeout(_ => {
      hljs.initHighlighting();
      mapElems('searchExample', el => {
        Elm.embed(Elm.SearchExample, el)
      })
      mapElems('rExample', rExample)
      mapElems('normalSearch', normalSearch)
    }, 100) // Wait for view to update
    ran = true
  })
})()

