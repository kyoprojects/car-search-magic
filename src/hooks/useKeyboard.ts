import { useEffect, useCallback } from 'react';

interface UseKeyboardProps {
  onOpen?: () => void;
  onClose?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onEnter?: () => void;
  isOpen?: boolean;
}

export const useKeyboard = ({
  onOpen,
  onClose,
  onArrowUp,
  onArrowDown,
  onEnter,
  isOpen,
}: UseKeyboardProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Command/Ctrl + K to open
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        onOpen?.();
      }

      if (!isOpen) return;

      // Escape to close
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose?.();
      }

      // Arrow navigation
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onArrowUp?.();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onArrowDown?.();
      }

      // Enter selection
      if (event.key === 'Enter') {
        event.preventDefault();
        onEnter?.();
      }
    },
    [isOpen, onOpen, onClose, onArrowUp, onArrowDown, onEnter]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};