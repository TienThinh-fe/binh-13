import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { insertCoin } from 'playroomkit'

import './index.css'
import './reset.css'

insertCoin().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
