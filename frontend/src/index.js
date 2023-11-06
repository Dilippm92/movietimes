import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from "./store"
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
const client_id =process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(

    <BrowserRouter>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={client_id}>
    <App />
     </GoogleOAuthProvider>
    </Provider>
    
    </BrowserRouter>
 

);


