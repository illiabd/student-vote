export type Option = {
  label: React.ReactNode | string;
  value: string;
};

export type DropdownProps = {
  id?: string;
  defaultValue?: string | Option | Option[];
  touched?: boolean;
  label?: string;
  options: (string | Option)[];
  multi?: boolean;
  creatable?: boolean;
  errors?: string | string[];
  placeholder?: string;
  isLoading?: boolean;
  noLabel?: boolean;
  disabled?: boolean;
  onInputChange?: (newValue: string) => void;
  onChange: (value: Option | Option[]) => void;
};
