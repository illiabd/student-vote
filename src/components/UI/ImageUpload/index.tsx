/* eslint-disable @next/next/no-img-element */
import { DropzoneOptions, useDropzone, FileRejection, ErrorCode } from 'react-dropzone';
import { Dismiss24Regular, ImageAdd24Regular } from '@fluentui/react-icons';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import {
  FILE_TOO_LARGE_WARN_MESSAGE,
  IMAGE_MAX_SIZE,
  SOMETHING_WENT_WRONG_MESSAGE,
} from '../../../constants';
import { IconButton } from '../IconButton';

import { ImageUploadProps } from './types';
import styles from './ImageUpload.module.scss';

export const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }) => {
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
    onChange(null);
  };

  const dropzoneOptions: DropzoneOptions = {
    maxFiles: 1,
    maxSize: IMAGE_MAX_SIZE,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop,
    onDropRejected,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  if (value) {
    return (
      <div className={styles['uploaded-container']}>
        <div className={styles['image-container']}>
          <img src={URL.createObjectURL(value)} alt="asd" className={styles.image} />
        </div>
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
      <ImageAdd24Regular />
      <span>Перетягніть сюди, або натисніть щоб обрати файл</span>
    </div>
  );
};
