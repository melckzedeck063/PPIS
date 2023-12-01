import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import store from './store/store';


import i18n from "./locales/i18n";
import IntProvider from './locales/Provider';
import { LOCALES } from './locales/locales';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntProvider locale={LOCALES.SWAHILI} >
    <ThemeProvider>
      <Provider store={store}>
         <App />
      </Provider>
    </ThemeProvider>
  </IntProvider>
  </React.StrictMode>
);


