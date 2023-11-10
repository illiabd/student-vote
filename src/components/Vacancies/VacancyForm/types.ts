export type VacancyFormValues = {
  title: string;
  description: string;
  remoteType: string;
  city: string;
  minSalary: number;
  maxSalary: number;
  textLength?: number;
};

export type VacancyFormProps = {
  onSubmit: (values: VacancyFormValues) => Promise<boolean>;
  defaultValues?: VacancyFormValues;
};
