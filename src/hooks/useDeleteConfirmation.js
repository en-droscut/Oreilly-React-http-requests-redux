import { useEffect } from "react";

export function useDeleteConfirmation(timerInput, onConfirm) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, timerInput);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);
}