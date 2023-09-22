import React from 'react'
// importacion mediante exportaciones por defecto
import ReactDOM from 'react-dom/client'
// importacion mediante exportacion normal
import { App } from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  // hace que react matenga un virtual Dom
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
)
