import React from 'react';
import cn from 'classnames';
import { EraseIcon } from '../Icons';
import styles from './Input.module.css';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
  onErase?: () => void;
}

function Input({ Icon, onErase, ...props }: InputProps) {
  const eraseDisabled = !props.value?.toString().trim();

  return (
    <div className={styles.inputWrapper}>
      <Icon className={styles.inputIcon} />
      <input
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
          }
        }}
        className={styles.input}
        {...props}
      />
      <button
        disabled={eraseDisabled}
        onClick={onErase}
        className={cn(styles.inputIcon, styles.erase)}
      >
        <EraseIcon />
      </button>
    </div>
  );
}

export type { InputProps };
export { Input };
