import 'dayjs/locale/uk';
import './components/UI/SeparatedInput/reactCodeInput.scss';
import './components/UI/Snackbar/snackbarStyles.scss';
import './styles/global.scss';
import './styles/reset.scss';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { Snackbar } from './components/UI';
import store from './store';

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
