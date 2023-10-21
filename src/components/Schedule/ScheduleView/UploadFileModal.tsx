import axios, { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';

import api from '../../../axios';
import { handleResponseError } from '../../../tools/api-error-handler';
import { Button } from '../../UI';
import { ExcelUpload } from '../../UI/ExcelUpload';
import { UploadFileModalProps } from './types';

export const UploadFileModal: FC<UploadFileModalProps> = ({
  organisationId,
  weekDate,
  onClose,
}) => {
  const [scheduleFile, setScheduleFile] = useState<File>(undefined);

  const handleProfilePictureFileChange = (value: File) => {
    setScheduleFile(value);
  };

  const handleUploadBUttonClick = async () => {
    try {
      const response = await api.post(
        'schedule/v1/events/parse',
        { file: scheduleFile },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: { organisation: organisationId, weekDate },
        },
      );

      if (axios.isAxiosError(response)) {
        const error = response as AxiosError;
        const statusCode = error?.response?.status;

        switch (statusCode) {
          default:
            handleResponseError(error);
            return;
        }
      }

      toast.success('Файл завантажено!');

      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ExcelUpload value={scheduleFile} onChange={handleProfilePictureFileChange} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleUploadBUttonClick}>Завантажити</Button>
      </div>
    </>
  );
};
