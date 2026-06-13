export interface SearchFieldProps {
  readonly value: string;
  readonly isLoading: boolean;
  readonly onChange: (value: string) => void;
  readonly onSearch: () => void;
}
