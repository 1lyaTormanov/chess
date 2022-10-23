import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './rootStyles.sass';
import {Provider} from "react-redux";
import {connect, history} from "./saga/connect";
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import {InitToken} from "./initToken";
import {Root} from "./Root";

InitToken()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={connect}>
          <HistoryRouter history={history}>
              <Root/>
          </HistoryRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
