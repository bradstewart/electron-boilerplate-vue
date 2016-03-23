var hotClient = require('webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
