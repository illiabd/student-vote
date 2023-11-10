import { Attach24Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import { FormikProps, useFormik } from 'formik';
import { FC } from 'react';

import { newsSchema } from '../../../schemas';
import { CreateArticleRequest } from '../../../store/news/types';
import { Button, Card, Input } from '../../UI';
import { TextEditor } from '../../UI/TextEditor';
import styles from './NewsForm.module.scss';
import { NewsFormProps, NewsFormValues } from './types';

export const NewsForm: FC<NewsFormProps> = ({ organisationId, onSubmit }) => {
  const initialValues = {
    title: '',
    text: '',
    textLength: 0,
  };

  const formik: FormikProps<NewsFormValues> = useFormik<NewsFormValues>({
    initialValues,
    validationSchema: newsSchema,
    onSubmit: (values, { resetForm }) => {
      const article: CreateArticleRequest = {
        text: values.text,
        organisation: organisationId,
        title: values.title,
        isPublic: true,
      };
      onSubmit(article);
      resetForm();
    },
  });

  const handleTextEditorChange = (value: string, length: number) => {
    formik.setFieldValue('text', value);
    formik.setFieldValue('textLength', length);
  };

  const addMediaButtonClasses = clsx(styles.button, styles['icon-button']);
  const submitButtonClasses = clsx(styles.button, styles['submit-button']);

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.container}>
          <Input
            id="title"
            type="text"
            label="Заголовок"
            placeholder="Введіть заголовок новини"
            value={formik.values.title}
            touched={formik.touched.title}
            errors={formik.errors.title}
            onChange={formik.handleChange}
          />

          <TextEditor
            id="text"
            label="Детальний опис"
            errors={formik.errors.textLength}
            onChange={handleTextEditorChange}
            touched={formik.touched.text}
          />

          <div className={styles['button-container']}>
            <Button
              size="md"
              variant="outlined"
              startIcon={<Attach24Regular />}
              className={addMediaButtonClasses}
            >
              Додати медіа
            </Button>
            <Button type="submit" size="md" className={submitButtonClasses}>
              Створити
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
