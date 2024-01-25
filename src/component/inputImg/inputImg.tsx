import React, { useRef, ChangeEvent } from 'react';
 // Підключіть ваш файл стилів
import styles from "./inputImg.module.scss";

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={styles.customFileInput}>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <button type="button" onClick={handleClick} className={styles.button}>
        Завантажити фото
      </button>
    </div>
  );
};

export default FileInput;