'use client';

import React, { useEffect } from 'react';
import { SearchInput } from '../Input';
import { Button } from '../Button';
import styles from './SearchForm.module.css';
interface Search {
  search?: string | '';
}

interface SearchFormProps {
  initialValues?: Search;
  onSubmit?: (values: Search) => void;
}

const EMPTY: Search = {
  search: '',
} as const;

const SUBMIT_BUTTON_LABEL = 'Искать';

function SearchForm({
  initialValues = EMPTY,
  onSubmit,
}: SearchFormProps) {
  const [values, setValues] = React.useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSubmit?.(values);
  };

  const handleKey = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit?.(values);
    }
  };

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [setValues]
  );

  const handleErase = () => {
    setValues(EMPTY);
    onSubmit?.(EMPTY);
  };

  return (
    <form
      onKeyUp={handleKey}
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <SearchInput
        type="text"
        value={values.search}
        name="search"
        onChange={handleChange}
        onErase={handleErase}
      />
      <Button type="submit" primary>
        {SUBMIT_BUTTON_LABEL}
      </Button>
    </form>
  );
}

export type { SearchFormProps };
export { SearchForm };
