export type SearchFieldProps = Readonly<{
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSearch: () => void;
}>;
