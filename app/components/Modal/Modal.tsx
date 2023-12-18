'use client';
import React from 'react';
import cn from 'classnames';
import { CloseIcon } from '../Icons';
import { IconButton } from '../Button';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose?: VoidFunction;
  children?: React.ReactElement;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <dialog open={isOpen} className={styles.modal}>
      <div className={styles.inner}>
        <div className={cn(styles.modalContent, styles.content)}>
          {children}
        </div>
        <IconButton
          Icon={CloseIcon}
          className={styles.close}
          onClick={onClose}
        />
      </div>
    </dialog>
  );
}

export { Modal };
