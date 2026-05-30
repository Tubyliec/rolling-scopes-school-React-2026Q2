export type SearchState = Readonly<{
  term: string;
  isLoading: boolean;
  setTerm: (term: string) => void;
  setIsLoading: (loading: boolean) => void;
}>;
