import type { JSX } from 'react';

import { useSelectionStore } from '@/core/store/selection-store.ts';

import { downloadSelectedAsCsv } from '@/shared/utilities/download-csv.ts';

import './flyout.scss';

function Flyout(): JSX.Element | null {
  const { selectedItems, unselectAll } = useSelectionStore();

  if (selectedItems.size === 0) return null;

  const handleDownload = (): void => {
    downloadSelectedAsCsv(Array.from(selectedItems.values()));
  };

  const itemsText =
    selectedItems.size === 1 ? ' item selected' : ' items selected';

  return (
    <div className="flyout" role="complementary">
      <div className="flyout__wrapper wrapper">
        <span className="flyout__count">
          <span className="flyout__count-number">{selectedItems.size}</span>
          {itemsText}
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
            onClick={handleDownload}
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