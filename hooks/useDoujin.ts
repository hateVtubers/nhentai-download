import { SyntheticEvent, useCallback, useState } from "react";

export const useDoujin = <T>(initialState: T) => {
  const [doujins, setDoujins] = useState<T>(initialState);

  const handleDoujin = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement;
      // @ts-ignore
      value.length === 6 && e.key === "Enter" && setDoujins([...doujins, value]);
    },
    [doujins]
  );

  const handlerRemove = (index: number) => {
    // @ts-ignore
    setDoujins(doujins.filter((v, i) => i !== index));
  };

  return {
    doujins,
    handleDoujin,
    handlerRemove,
  };
};
