import { useEffect, useRef, useCallback } from 'react';

export interface FocusTrapOptions {
  active: boolean;
  restoreFocus?: boolean;
}

export function useFocusTrap({ active, restoreFocus = true }: FocusTrapOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(containerRef.current.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  const focusFirstElement = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [getFocusableElements]);

  const focusLastElement = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }, [getFocusableElements]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!active || !containerRef.current) return;

    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: if focus is on first element, move to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if focus is on last element, move to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [active, getFocusableElements]);

  useEffect(() => {
    if (active) {
      // Store the currently focused element
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      
      // Focus the first element in the trap
      setTimeout(() => {
        focusFirstElement();
      }, 0);

      // Add event listener
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else if (restoreFocus && previousActiveElementRef.current) {
      // Restore focus to the previously focused element
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, [active, restoreFocus, focusFirstElement, handleKeyDown]);

  return containerRef;
}
