import React from 'react';
import styles from './IconButton.module.css';
import cn from 'classnames';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ElementType;
}

function IconButton({ Icon, className, ...props }: IconButtonProps) {
  return (
    <button className={cn(styles.button, className)} {...props}>
      <Icon />
    </button>
  );
}

export { IconButton };
export type { IconButtonProps };
