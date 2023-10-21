import { FormikProps, useFormik } from 'formik';
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { newsSchema } from '../../../schemas';
import { findNews, patchArticle } from '../../../store/news/actions';
import { CreateArticleRequest } from '../../../store/news/types';
import { Button, Input } from '../../UI';
import { TextEditor } from '../../UI/TextEditor';
import { NewsFormValues } from '../NewsForm/types';
import styles from './NewsCard.module.scss';
import { EditArticleModalProps } from './types';

export const EditArticleModal: FC<EditArticleModalProps> = ({ data, onClose }) => {
  const { isLoading } = useAppSelector((state) => state.current);
  const dispatch = useAppDispatch();

  const formik: FormikProps<NewsFormValues> = useFormik<NewsFormValues>({
    initialValues: {
      title: data.title ?? '',
      text: data.text ?? '',
      textLength: 0,
    },
    validationSchema: newsSchema,
    onSubmit: async (values, { resetForm }) => {
      const article: CreateArticleRequest = {
        text: values.text,
        organisation: data.organisation,
        title: values.title,
        isPublic: true,
      };

      if (!data.id) {
        return;
      }

      await dispatch(patchArticle(data.id, article));
      await dispatch(findNews({ organisation: data.organisation }));
      resetForm();
      onClose();
    },
  });

  const handleTextEditorChange = (value: string, length: number) => {
    formik.setFieldValue('text', value);
    formik.setFieldValue('textLength', length);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles['edit-modal']}>
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
          defaultContentHTML={data?.text}
          onChange={handleTextEditorChange}
          touched={formik.touched.text}
        />
        <div className={styles['buttons-container']}>
          <Button onClick={onClose} variant="outlined">
            Скасувати
          </Button>
          <Button type="submit" loading={isLoading}>
            Зберегти зміни
          </Button>
        </div>
      </div>
    </form>
  );
};
