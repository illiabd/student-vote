export type LinksInputProps = {
  placeholder?: string;
  className?: string;
  touched?: boolean;
  rounded?: boolean;
  errors?: string | string[];
  label?: string;
  type?: string;
  id?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
};

export type LinksProps = {
  id: number;
  link: string;
  onDelete: (id: number) => void;
};
