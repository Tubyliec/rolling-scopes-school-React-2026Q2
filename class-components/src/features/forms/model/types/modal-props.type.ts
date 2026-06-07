import type { ReactNode } from 'react';

export type ModalProps = Readonly<{
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}>;
