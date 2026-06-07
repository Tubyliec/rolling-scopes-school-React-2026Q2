import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export function useFocusTrap(
  isOpen: boolean,
  onClose: () => void
): RefObject<HTMLDivElement | null> {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      });
    }

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (!isOpen) {
        previousFocusRef.current?.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  return dialogRef;
}
