import './flyout.scss';

import type { JSX } from 'react';

import { useSelectionStore } from '@/core/store/selection-store.ts';
import { downloadSelectedAsCsv } from '@/shared/utilities/download-csv.ts';

function Flyout(): JSX.Element | null {
  const { selectedItems, unselectAll } = useSelectionStore();

  if (selectedItems.length === 0) return null;

  const useDownload = (): void => {
    downloadSelectedAsCsv(selectedItems);
  };

  return (
    <div
      className="flyout"
      role="complementary"
      aria-label="Selected items actions"
    >
      <div className="flyout__wrapper wrapper">
        <span className="flyout__count">
          <span className="flyout__count-number">{selectedItems.length}</span>
          {selectedItems.length === 1 ? ' item selected' : ' items selected'}
        </span>
        <div className="flyout__actions">
          <button
            className="flyout__btn flyout__btn--secondary"
            onClick={unselectAll}
            type="button"
          >
            Unselect all
          </button>
          <button
            className="flyout__btn flyout__btn--primary"
            onClick={useDownload}
            type="button"
          >
            ↓ Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Flyout;
