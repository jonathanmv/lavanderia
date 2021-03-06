import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import initReactFastclick from 'react-fastclick'
// Disabled because deleting state was triggered twice
// initReactFastclick()

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
