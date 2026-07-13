import { useSelectionStore } from '@features/store/selection-store';

import '@testing-library/jest-dom';
import { beforeEach } from 'vitest';

beforeEach(() => {
  useSelectionStore.setState({ selectedItems: new Map() });
});
