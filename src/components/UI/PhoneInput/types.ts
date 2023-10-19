export type Country = {
  ISOCode: string;
  callingCode: string;
};

export type PhoneInputProps = {
  className?: string;
  touched?: boolean;
  errors?: string;
  label?: string;
  value?: string;
  id?: string;
  onChange?: (value: string) => void;
};
