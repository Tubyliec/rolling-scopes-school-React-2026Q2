import type { ModalType } from '@pages/forms/model/types/modal.type.ts';

export type FormOpenButtonProps = {
  label: string;
  modalType: ModalType;
  variant?: 'default' | 'rhf';
  onClick: (modalType: ModalType) => void;
};
