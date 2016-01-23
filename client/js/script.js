const Elm = window.Elm

const mapElems = (className, cb) => [].map
  .call(
    document.getElementsByClassName(
      className
    ),
    cb
  )


const presentation = Elm.fullscreen(Elm.Presentation)

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

