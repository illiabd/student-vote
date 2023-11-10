export type TextEditorProps = {
  id?: string;
  label?: string;
  defaultContentHTML?: string;
  editable?: boolean;
  touched?: boolean;
  errors?: string | string[];
  onChange?: (value: string, length: number) => void;
};
