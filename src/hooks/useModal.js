/**
 * useModal - Custom hook for modal open/close state
 * @param {boolean} initialState
 * @returns {[boolean, function, function]}
**/

import { useState, useCallback } from 'react';

export default function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return [isOpen, open, close];
}