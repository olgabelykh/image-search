import React from 'react';
import cn from 'classnames';
import styles from './Button.module.css';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

function Button({ primary = false, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, {
        [styles.buttonPrimary]: primary,
      })}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps };
