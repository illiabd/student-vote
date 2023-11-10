import { ScreenOrientation } from '../../../constants';

type Orientation = ScreenOrientation.landscape | ScreenOrientation.portrait;

export type StepProps = {
  selectedNumber: number;
  orientation: Orientation;
  number: number;
  isLast: boolean;
  title: string;
  onClick: () => void;
};

export type FormProps<> = {
  onNext: () => void;
  orientation: Orientation;
};

export type AccountFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type AccountFormProps = FormProps;

export type CompanyFormValues = {
  name: string;
  link: string;
  email: string;
  douLink: string;
};

export type CompanyFormProps = FormProps;

export type UserFormValues = {
  firstName: string;
  lastName: string;
  socialMediaLinks: string[];
};

export type UserFormProps = FormProps;
