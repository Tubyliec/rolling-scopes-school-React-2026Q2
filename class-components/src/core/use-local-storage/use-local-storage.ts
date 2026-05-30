import { useState } from 'react';

import type { LSRequest } from './model/interfaces/ls-request.interface';
import type { LSResponse } from './model/interfaces/ls-response.interface';

export function useLocalStorage({ key, initialValue }: LSRequest): LSResponse {
  const [storedValue, setStoredValue] = useState<string>(
    () => localStorage.getItem(key) ?? initialValue
  );

  const setValue = (value: string): void => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return { value: storedValue, setValue };
}
