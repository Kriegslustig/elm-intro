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
    initHashSignal: location.hash
  }
)

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
      mapElems('searchExample', el => {
        Elm.embed(Elm.SearchExample, el)
      })
    }, 100) // Wait for view to update
    ran = true
  })
})()

