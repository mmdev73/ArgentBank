import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import './sass/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
  </Provider>
)
