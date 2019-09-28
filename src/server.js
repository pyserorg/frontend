import App from './App'
import React from 'react'
// import { StaticRouter } from 'react-router-dom'
import express from 'express'
// import { renderToString } from 'react-dom/server'
import proxy from 'http-proxy-middleware'


const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)
const server = express()


server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

if (process.env.BACKEND_URL) {
  server.use('/api', proxy({
    target: process.env.BACKEND_URL,
    changeOrigin: true
  }))
  server.use('/media', proxy({
    target: process.env.BACKEND_URL,
    changeOrigin: true
  }))
}

server.get('/*', (req, res) => {
  const context = {}
  // const markup = renderToString(
    // <StaticRouter context={context} location={req.url}>
      // <App />
    // </StaticRouter>
  // )

  if (context.url) {
    res.redirect(context.url)
  } else {
    res.status(200).send(
      `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>PySer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
  </head>
  <body>
      <div id="root"></div>
  </body>
</html>`
    )
  }
})

export default server
