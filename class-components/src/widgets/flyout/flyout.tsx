'use client';

import type { JSX } from 'react';

import { useTranslations } from 'next-intl';

import { useSelectionStore } from '@features/store/selection-store';

import { ActionButton } from '@/shared/ui/buttons/action-button/action-button.tsx';
import { generateCsvBlob } from '@/shared/utilities/generate-csv-blob.ts';

import './flyout.scss';

function Flyout(): JSX.Element | null {
  const { selectedItems, unselectAll } = useSelectionStore();
  const translation = useTranslations('pagination');

  if (selectedItems.size === 0) return null;

  const handleDownload = (): void => {
    const items = Array.from(selectedItems.values());
    const csv = generateCsvBlob(items);
    const url = URL.createObjectURL(csv);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${items.length}_items.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const itemCount = selectedItems.size;
  const itemsText = translation('itemsSelected');

  return (
    <div className="flyout" role="complementary">
      <div className="flyout__wrapper wrapper">
        <span className="flyout__count">
          <span className="flyout__count-number">{itemCount}</span>
          {itemsText}
        </span>
        <div className="flyout__actions">
          <ActionButton onClick={unselectAll} variant="secondary">
            {translation('unselectAll')}
          </ActionButton>
          <ActionButton onClick={handleDownload} variant="primary">
            {translation('download')}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default Flyout;
