import type { SyntheticEvent } from 'react';

export function stopPropagation(event: SyntheticEvent): void {
  event.stopPropagation();
}
