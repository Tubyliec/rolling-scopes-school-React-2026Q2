import './spinner.scss';

import type { JSX } from 'react';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner__track" />
      <span className="spinner__label">LOADING DATA</span>
    </div>
  );
}

export default Spinner;
