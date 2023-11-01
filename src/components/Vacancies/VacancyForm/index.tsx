import { ChevronLeft24Filled } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FormikProps, useFormik } from 'formik';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { vacancySchema } from '../../../schemas/create-vacancy-schema';
import { Button, Card, Dropdown, IconButton, Input } from '../../UI';
import type { Option } from '../../UI/Dropdown/types';
import { TextEditor } from '../../UI/TextEditor';
import { VacancyFormProps, VacancyFormValues } from './types';
import styles from './VacancyForm.module.scss';

export const VacancyForm: FC<VacancyFormProps> = ({ defaultValues, onSubmit }) => {
  const navigate = useNavigate();

  const initialValues: VacancyFormValues = {
    title: defaultValues?.title ?? '',
    description: defaultValues?.description ?? '',
    remoteType: defaultValues?.remoteType ?? '',
    city: defaultValues?.city ?? '',
    minSalary: defaultValues?.minSalary ?? 0,
    maxSalary: defaultValues?.maxSalary ?? 0,
    textLength: defaultValues?.description.length ?? 0,
  };

  const formik: FormikProps<VacancyFormValues> = useFormik<VacancyFormValues>({
    initialValues,
    validateOnBlur: true,
    validationSchema: vacancySchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await onSubmit(values);
      if (response) {
        resetForm();
      }
    },
  });

  const handleTextEditorChange = (value: string, length: number) => {
    formik.setFieldValue('description', value);
    formik.setFieldValue('textLength', length);
  };

  const handleDropdownChange = (value: Option | Option[]) => {
    const isOptionArray = Array.isArray(value);
    if (isOptionArray) {
      return;
    }

    formik.setFieldValue('remoteType', value.value);
  };

  const handleBackButtonClick = () => {
    navigate('/vacancies');
  };

  const submitButtonClasses = clsx(styles.button, styles['submit-button']);

  const remoteTypeOptions: Option[] = [
    { value: 'office', label: 'офіс' },
    { value: 'full_remote', label: 'віддалено' },
    { value: 'partly_remote', label: 'частково віддалено' },
    { value: 'employee_choice', label: 'офіс / віддалено' },
  ];

  const submitButtonText = defaultValues ? 'Зберегти' : 'Створити';
  const headerText = defaultValues ? 'Редагування' : 'Нова вакансія';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IconButton onClick={handleBackButtonClick}>
          <ChevronLeft24Filled />
        </IconButton>
        <span>{headerText}</span>
      </div>
      <Card className={styles.card}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles['form-container']}>
            <Input
              maxLength={110}
              id="title"
              type="text"
              label="Хто вам потрібен?*"
              placeholder="Junior React Developer"
              value={formik.values.title}
              touched={formik.touched.title}
              onChange={formik.handleChange}
              errors={formik.errors.title}
            />

            <TextEditor
              id="description"
              label="Детальний опис*"
              defaultContentHTML={defaultValues?.description}
              errors={formik.errors.textLength}
              onChange={handleTextEditorChange}
              touched={formik.touched.description}
            />

            <Dropdown
              id="remoteType"
              label="Офіс / віддалено*"
              options={remoteTypeOptions}
              touched={formik.touched.remoteType}
              defaultValue={remoteTypeOptions.find(
                (option) => option?.value === formik.values.remoteType,
              )}
              onChange={handleDropdownChange}
              placeholder="офіс, віддалено..."
              errors={formik.errors.remoteType}
            />

            <Input
              maxLength={110}
              id="city"
              type="text"
              label="Місто*"
              placeholder="Одеса"
              value={formik.values.city}
              touched={formik.touched.city}
              onChange={formik.handleChange}
              errors={formik.errors.city}
            />

            <span>Діапазон заробітної плати (у місяць), $:</span>
            <div className={styles.salary}>
              <Input
                maxLength={6}
                id="minSalary"
                type="text"
                label="Від:*"
                placeholder="0"
                value={formik.values?.minSalary?.toString() ?? ''}
                touched={formik.touched.minSalary}
                onChange={formik.handleChange}
                errors={formik.errors.minSalary}
              />
              <Input
                maxLength={6}
                id="maxSalary"
                type="text"
                label="До:*"
                placeholder="300"
                value={formik.values?.maxSalary?.toString() ?? ''}
                touched={formik.touched.maxSalary}
                onChange={formik.handleChange}
                errors={formik.errors.maxSalary}
              />
            </div>

            <div className={styles['button-container']}>
              <Button type="submit" size="md" className={submitButtonClasses}>
                {submitButtonText}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
