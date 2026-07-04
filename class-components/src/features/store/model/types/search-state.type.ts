export type SearchState = Readonly<{
  term: string;
  setTerm: (term: string) => void;
}>;
