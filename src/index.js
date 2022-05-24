import React from 'react'
//import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import { ContextProvider } from './Context'
import './index.css'
import reportWebVitals from './reportWebVitals';

//ReactDOM.createRoot(document.getElementById('root')).render(
  ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

//Had to run code like React 17 because ReCharts not responsive with React > 18