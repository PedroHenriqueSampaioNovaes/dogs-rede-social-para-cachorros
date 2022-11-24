import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, type, name, error, value, onChange, onBlur, min }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
