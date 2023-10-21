import 'react-toastify/dist/ReactToastify.css';

import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

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
