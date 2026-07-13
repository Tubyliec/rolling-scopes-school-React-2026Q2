'use client';

import type { JSX } from 'react';

import './spinner.scss';

function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="spinner__track" />
      <span className="spinner__label">LOADING DATA</span>
    </div>
  );
}

export default Spinner;
