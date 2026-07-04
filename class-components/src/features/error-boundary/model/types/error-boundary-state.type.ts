export type ErrorBoundaryState = Readonly<{
  hasError: boolean;
  error: Error | null;
}>;
