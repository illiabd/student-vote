export type LoginResponse = {
  data: {
    oneTimeToken: string;
  };
};

export type VerifyResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  isSuperadmin: boolean;
  type: string;
  telegramLink: string;
};

export type State = {
  userData: UserData;
  needVerification: boolean;
  isLoading: boolean;
};

export type GetUserResponse = {
  data: {
    user: UserData;
  };
};
