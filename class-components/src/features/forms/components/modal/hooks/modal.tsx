import { type JSX, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import { CloseButton } from '@shared/ui/buttons/close-button/close-button.tsx';

import type { ModalProps } from '@/features/forms/model/types/modal-props.type.ts';

import { useFocusTrap } from '../use-focus-trap.ts';

import '../modal.scss';

function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps): JSX.Element | null {
  const dialogRef = useFocusTrap(isOpen, onClose);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog">
      <div className="modal" ref={dialogRef}>
        <div className="modal__header">
          <h2 className="modal__title" id="modal-title">
            {title}
          </h2>
          <CloseButton onClick={onClose} className="modal__close" />
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
