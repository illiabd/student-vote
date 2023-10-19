export type SeparatedInputProps = {
  value: string;
  length: number;
  errors?: string;
  touched?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};
