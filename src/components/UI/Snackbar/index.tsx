import { ToastContainer } from 'react-toastify';
import { FC } from 'react';

import 'react-toastify/dist/ReactToastify.css';

export const Snackbar: FC = () => (
  <ToastContainer
    position="bottom-right"
    limit={5}
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
);
