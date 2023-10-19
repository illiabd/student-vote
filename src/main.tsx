import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import React from 'react';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/uk';

import { Snackbar } from './components/UI';
import store from './store';
import App from './App';

import './components/UI/SeparatedInput/reactCodeInput.scss';
import './components/UI/Snackbar/snackbarStyles.scss';
import './styles/global.scss';
import './styles/reset.scss';

dayjs.extend(localeData);
dayjs.extend(isBetween);
dayjs.extend(isToday);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale('uk');

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Snackbar />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

root.render(app);
