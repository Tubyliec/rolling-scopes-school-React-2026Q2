export const ERROR_MESSAGES = {
  SERVER_ERROR: (status: number): string => `Server error ${status}...`,
  NETWORK_ERROR: 'Network error: Unable to connect to SWAPI server.',
  UNKNOWN_ERROR: 'Unknown error occurred',
} as const;
