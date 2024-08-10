import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom'; 
import awsconfig from './aws-exports'; 

Amplify.configure(awsconfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
