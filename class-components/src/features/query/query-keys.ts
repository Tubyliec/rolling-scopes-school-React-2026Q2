export const queryKeys = {
  people: (term: string, page: number) => ['people', term, page] as const,
  person: (id: string) => ['person', id] as const,
} as const;
