import { useState } from 'react';

function useTextInput(
  initialValue: string
): [
  string,
  (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
] {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    setValue(event.target.value);
  };

  return [value, handleValueChange];
}

function useNumberInput(
  initialValue: number
): [
  number,
  (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
] {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    setValue(parseInt(event.target.value, 10));
  };

  return [value, handleValueChange];
}

export { useTextInput, useNumberInput };
