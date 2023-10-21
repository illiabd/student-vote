import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import * as constants from '../constants';

export const handleResponseError = (e: AxiosError | undefined) => {
  const statusCode = e?.response?.status;
  console.log(e);

  switch (statusCode) {
    case 400:
    case 401:
    case 403:
    case 404:
      break;
    case 500:
      toast.error(constants.ETERNAL_SERVER_ERROR_MESSAGE);
      break;
    case undefined:
      break;
    default:
      toast.error(constants.SOMETHING_WENT_WRONG_MESSAGE);
      break;
  }
};
