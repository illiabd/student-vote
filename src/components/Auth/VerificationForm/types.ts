export type VerificationFormValues = {
  code: string;
};

export type VerificationFormProps = {
  className?: string;
  onSubmit?: (values: VerificationFormValues) => void;
  onResendCode?: () => void;
};
