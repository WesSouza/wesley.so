import React, { FormEvent, RefObject, useCallback } from 'react';

import { ContentEditable, Themes, ViewProps } from '~/src/ui';

interface Props extends ViewProps {
  multiLine?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  value?: string;
}

interface SingleLineProps {
  multiLine?: false;
  nativeRef?: RefObject<HTMLInputElement>;
}

interface MultiLineProps {
  multiLine: true;
  nativeRef?: RefObject<HTMLTextAreaElement>;
}

export function TextField(
  allProps: Props & (SingleLineProps | MultiLineProps),
) {
  const { onFocus, value, onBlur, onChange, onInput, ...props } = allProps;
  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);
  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);
  const handleChange = useCallback(
    (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.(event.currentTarget.value);
    },
    [onChange],
  );
  const handleInput = useCallback(
    (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onInput?.(event.currentTarget.value);
    },
    [onInput],
  );

  /*
  I know this doesn't look right, but if you pass `multiLine` before testing it,
  TypeScript is not able to infer the remaining properties:

    Type '{...}' is not assignable to type '(IntrinsicAttributes & Props & InputProps) | (IntrinsicAttributes & Props & TextAreaProps)'.
    Type '{...}' is not assignable to type 'TextAreaProps'.
      Types of property 'multiLine' are incompatible.
        Type 'boolean' is not assignable to type 'true'.
    ts(2322)
  */
  if (props.multiLine) {
    return (
      <ContentEditable
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onInput={handleInput}
        theme={Themes.frameInset}
        value={value}
        {...props}
      />
    );
  }

  return (
    <ContentEditable
      multiLine={false}
      nativeRef={props.nativeRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      onInput={handleInput}
      theme={Themes.frameInset}
      value={value}
      {...props}
    />
  );
}
