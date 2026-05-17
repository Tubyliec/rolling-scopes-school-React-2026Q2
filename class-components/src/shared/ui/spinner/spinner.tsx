import { Component, type JSX } from 'react';
import './spinner.scss';

class Spinner extends Component {
  public render(): JSX.Element {
    return (
      <div className="spinner">
        <div className="spinner__track" />
        <span className="spinner__label">LOADING DATA</span>
      </div>
    );
  }
}

export default Spinner;
