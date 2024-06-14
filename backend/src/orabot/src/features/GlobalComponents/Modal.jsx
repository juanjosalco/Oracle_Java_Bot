// Modal.js
import React from 'react';

import './Styles/Modal.css';
import { MyButton } from './Button';

const Modal = ({ handleClose, show, children, applyFilter }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className='buttonsContainer'>
          <MyButton text="Close" onClick={handleClose} />
          <MyButton text="Apply" onClick={applyFilter} className="button red" />
        </div>
      </section>
    </div>
  );
};

export default Modal;
