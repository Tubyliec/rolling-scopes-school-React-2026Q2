import { useSelectionStore } from '@/core/store/selection-store.ts';

import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';

beforeEach(() => {
  useSelectionStore.setState({ selectedItems: new Map() });
});
