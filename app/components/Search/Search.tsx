'use client';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { SearchForm } from '../SearchForm';
import styles from './Search.module.css';

interface SearchProps {
  search: string;
}

function Search({ search }: SearchProps) {
  const router = useRouter();

  const onSubmit = ({ search }: { search?: string }) => {
    if (!search) {
      router.push('/');
    } else {
      router.push(`/?search=${search}`);
    }
  };

  return (
    <div
      className={cn(styles.search, {
        [styles.searchActive]: !!search,
      })}
    >
      <SearchForm initialValues={{ search }} onSubmit={onSubmit} />
    </div>
  );
}

export { Search };
