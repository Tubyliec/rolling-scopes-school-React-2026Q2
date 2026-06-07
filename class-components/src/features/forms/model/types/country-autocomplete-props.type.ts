export type CountryAutocompleteProps = Readonly<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  errorId?: string;
  hasError?: boolean;
}>;
