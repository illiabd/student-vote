import { useFormik } from 'formik';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../../hooks';
import { companyInfoPatchSchema } from '../../../schemas';
import { patchOrganisation, uploadProfilePicture } from '../../../store/current/actions';
import { findOrganisations } from '../../../store/organisations/actions';
import { Organisation } from '../../../store/organisations/types';
import { Button, ImageUpload, Input, ProfilePicture } from '../../UI';
import styles from './OrganisationCard.module.scss';
import { CompanyFormValues, EditModalProps } from './types';

export const EditModal: FC<EditModalProps> = ({ organisationData, onClose }) => {
  const [profilePictureFile, setProfilePictureFile] = useState<File>();
  const dispatch = useAppDispatch();

  const initialValues: CompanyFormValues = {
    name: organisationData.name ?? '',
    link: organisationData.link ?? '',
    email: organisationData.email ?? '',
    douLink: organisationData.douLink ?? '',
  };

  const onSubmit = async (values: CompanyFormValues) => {
    if (!profilePictureFile) {
      return;
    }

    const response = await dispatch(uploadProfilePicture({ file: profilePictureFile }));
    if (!response) {
      return;
    }

    const newProfilePictureData = response;
    const patchBody: Organisation = {
      id: organisationData.id,
      profilePictureLink: newProfilePictureData.url,
      ...values,
    };

    await dispatch(patchOrganisation(patchBody));
    await dispatch(
      findOrganisations({
        filters: { role: 'admin' },
      }),
    );

    onClose();
  };

  const formik = useFormik<CompanyFormValues>({
    initialValues,
    validationSchema: companyInfoPatchSchema,
    onSubmit,
  });

  const handleProfilePictureFileChange = (value: File) => {
    if (!value) {
      return;
    }
    setProfilePictureFile(value);
  };

  const handleFormSubmission = async () => {
    formik.handleSubmit();
  };

  const pictureSrc = profilePictureFile
    ? URL.createObjectURL(profilePictureFile)
    : organisationData.profilePictureLink;

  return (
    <div className={styles['modal-container']}>
      <form className={styles['inputs-container']}>
        <Input
          id="name"
          type="text"
          label="Назва компанії"
          placeholder="Student Vote"
          className={styles.input}
          value={formik.values.name}
          errors={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
        />
        <Input
          id="email"
          type="email"
          label="E-mail"
          className={styles.input}
          value={formik.values.email}
          errors={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
        />
        <Input
          id="link"
          type="text"
          label="Сайт компанії"
          className={styles.input}
          value={formik.values.link}
          errors={formik.errors.link}
          touched={formik.touched.link}
          onChange={formik.handleChange}
        />
        <Input
          id="douLink"
          type="text"
          label="DOU.ua"
          placeholder="jobs.dou.ua"
          className={styles.input}
          value={formik.values.douLink}
          errors={formik.errors.douLink}
          touched={formik.touched.douLink}
          onChange={formik.handleChange}
        />
      </form>

      <span style={{ marginBottom: '20px', marginTop: '40px' }}>Завантажте нове фото профілю</span>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Попередній перегляд:</span>
        <ProfilePicture source={pictureSrc} alternative={organisationData.name ?? ''} />
      </div>
      <ImageUpload value={profilePictureFile as File} onChange={handleProfilePictureFileChange} />

      <div className={styles['modal-buttons']}>
        <Button variant="outlined" onClick={onClose}>
          Скасувати
        </Button>
        <Button onClick={handleFormSubmission}>Зберегти</Button>
      </div>
    </div>
  );
};
