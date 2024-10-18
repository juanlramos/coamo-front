import { useCallback, useRef } from "react";

export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const deboucing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(notDelayInFirstTime);

  /**
   * cria um delay na hora de fazer uma busca
   * se for a busca quando a tela carrega é instantaneo senão tem delay
   * e tambem impede que o debounce seja chamado mais de uma vez
   */
  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (deboucing.current) {
          clearTimeout(deboucing.current);
        }
        deboucing.current = setTimeout(() => {
          func();
        }, delay);
      }
    },
    [delay]
  );

  return { debounce };
};
