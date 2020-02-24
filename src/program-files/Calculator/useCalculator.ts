import { useCallback, useRef, useState } from 'react';

type OperationTypes = '+' | '-' | '*' | '/' | 'sqrt' | '%' | '1/x' | '+/-';

export function useCalculator() {
  const [display, setDisplay] = useState('0.');
  const [memoryDisplay, setMemoryDisplay] = useState('');
  const answer = useRef(0);
  const entry = useRef(0);
  const entryString = useRef('');
  const operation = useRef<OperationTypes | null>(null);
  const lastWasResult = useRef(false);

  const updateData = useCallback(
    (
      value: string,
      { updateEntry = false }: { updateEntry?: boolean } = {},
    ) => {
      if (value === '') {
        value = '0';
      }
      if (value === '.') {
        value = '0.';
      }
      value = value.replace(/^0+([0-9])/, '$1');
      setDisplay(value.includes('.') ? value : value + '.');

      if (updateEntry) {
        entry.current = Number(value);
        entryString.current = value;
      }
    },
    [],
  );

  const commitOperation = useCallback(() => {
    switch (operation.current) {
      case '+':
        answer.current = answer.current + entry.current;
        break;
      case '-':
        answer.current = answer.current - entry.current;
        break;
      case '*':
        answer.current = answer.current * entry.current;
        break;
      case '/':
        answer.current = answer.current / entry.current;
        break;
      case 'sqrt':
        answer.current = Math.sqrt(answer.current || entry.current);
        break;
      case '%':
        answer.current = answer.current * (entry.current / 100);
        break;
      case '1/x':
        answer.current = 1 / answer.current;
        break;
      case '+/-':
        answer.current = answer.current * -1;
        break;
      case null:
        answer.current = entry.current;
        break;
    }

    const fixedEntry = answer.current.toFixed(10).replace(/0+$/, '');
    updateData(fixedEntry, {
      updateEntry: !lastWasResult.current,
    });
  }, [updateData]);

  const handleNumber = useCallback(
    (number: number) => () => {
      const newInput = entryString.current + String(number);
      updateData(newInput, { updateEntry: true });
    },
    [updateData],
  );

  const handleDot = useCallback(() => {
    if (entryString.current.includes('.')) {
      return;
    }
    const newInput = entryString.current + '.';
    updateData(newInput, { updateEntry: true });
  }, [updateData]);

  const handleOperation = useCallback(
    (operationType: OperationTypes) => () => {
      if (!lastWasResult.current) {
        commitOperation();

        if (
          operationType === '+/-' ||
          operationType === '1/x' ||
          operationType === 'sqrt'
        ) {
          operation.current = operationType;
          commitOperation();
        }
      }

      entry.current = 0;
      entryString.current = '';
      lastWasResult.current = false;
      operation.current = operationType;
    },
    [commitOperation],
  );

  const handleResult = useCallback(() => {
    lastWasResult.current = true;
    commitOperation();
  }, [commitOperation]);

  const handleBackspace = useCallback(() => {
    const input = entryString.current;
    const lastDigit = input[entryString.current.length - 1];
    const lengthToDelete = lastDigit === '.' ? 2 : 1;
    const newInput = entryString.current.substr(
      0,
      entryString.current.length - lengthToDelete,
    );
    updateData(newInput, { updateEntry: true });
  }, [updateData]);

  const handleClear = useCallback(() => {
    updateData('0', { updateEntry: true });
    answer.current = 0;
    lastWasResult.current = false;
    operation.current = null;
  }, [updateData]);

  const handleClearEntry = useCallback(() => {
    updateData('0', { updateEntry: true });
    lastWasResult.current = false;
  }, [updateData]);

  const handleMemoryClear = useCallback(() => {
    setMemoryDisplay('');
  }, []);
  const handleMemoryAdd = useCallback(() => {
    setMemoryDisplay('M');
  }, []);
  const handleMemorySet = useCallback(() => {
    setMemoryDisplay('M');
  }, []);
  const handleMemoryRead = useCallback(() => {}, []);

  return {
    display,
    handleBackspace,
    handleClear,
    handleClearEntry,
    handleDot,
    handleMemoryAdd,
    handleMemoryClear,
    handleMemoryRead,
    handleMemorySet,
    handleNumber,
    handleOperation,
    handleResult,
    memoryDisplay,
  };
}
