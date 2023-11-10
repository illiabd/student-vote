import { AxiosRequestConfig } from 'axios';

export interface ICustomRequestConfig extends AxiosRequestConfig {
  isRetried?: boolean;
}

export type RefreshTokensResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
