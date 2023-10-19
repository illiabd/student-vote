export type LoginFormValues = {
  phoneNumber: string;
  password: string;
};

export type LoginFormProps = {
  className?: string;
  onSubmit: (values: LoginFormValues) => void;
};
