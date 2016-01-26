module.exports = (url, cb) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', res => cb(JSON.parse(req.responseText)))
  req.open('GET', url)
  req.send()
}

