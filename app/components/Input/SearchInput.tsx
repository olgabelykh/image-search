import { Input, InputProps } from './Input';
import { SearchIcon } from '../Icons/SearchIcon';

interface SearchInputProps extends Omit<InputProps, 'Icon'> {}

function SearchInput(props: SearchInputProps) {
  return <Input {...props} Icon={SearchIcon} />;
}

export type { SearchInputProps };
export { SearchInput };
