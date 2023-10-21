import { Dismiss24Regular, Document24Regular, DocumentAdd24Regular } from '@fluentui/react-icons';
import { FC, useCallback } from 'react';
import { DropzoneOptions, ErrorCode, FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import {
  FILE_TOO_LARGE_WARN_MESSAGE,
  IMAGE_MAX_SIZE,
  SOMETHING_WENT_WRONG_MESSAGE,
} from '../../../constants';
import { IconButton } from '../IconButton';
import styles from './ExcelUpload.module.scss';
import { ExcelUploadProps } from './types';

export const ExcelUpload: FC<ExcelUploadProps> = ({ value, onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      onChange(acceptedFiles[0]);
    },
    [onChange],
  );

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const statusCode = fileRejections[0].errors[0].code;

    switch (statusCode) {
      case ErrorCode.FileTooLarge:
        toast.warn(FILE_TOO_LARGE_WARN_MESSAGE);
        break;
      case ErrorCode.FileInvalidType:
        toast.warn('wrong type');
        break;
      default:
        toast.warn(SOMETHING_WENT_WRONG_MESSAGE);
        break;
    }
  }, []);

  const onDeleteFile = () => {
    onChange(undefined);
  };

  const dropzoneOptions: DropzoneOptions = {
    maxFiles: 1,
    maxSize: IMAGE_MAX_SIZE,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    onDrop,
    onDropRejected,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  if (value) {
    return (
      <div className={styles['uploaded-container']}>
        <Document24Regular />
        <span>{value.name}</span>
        <IconButton onClick={onDeleteFile}>
          <Dismiss24Regular />
        </IconButton>
      </div>
    );
  }

  return (
    <div className={styles['dropzone-container']} {...getRootProps()}>
      <input {...getInputProps()} />
      <DocumentAdd24Regular />
      <span>Перетягніть сюди, або натисніть щоб обрати файл</span>
    </div>
  );
};
