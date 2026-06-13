import type { JSX } from 'react';

import type { PageButtonProps } from '../../model/types/page-button-props.type.ts';

import './page-button.scss';

function PageButton({ page, isActive, onClick }: PageButtonProps): JSX.Element {
  const handleClick = (): void => {
    onClick(page);
  };

  const className = `pagination__page ${isActive ? 'pagination__page--active' : ''}`;

  return (
    <button className={className} onClick={handleClick} disabled={isActive}>
      {page}
    </button>
  );
}

export default PageButton;
