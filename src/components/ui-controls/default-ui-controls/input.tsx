import { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLElement> & {
  label?: string | undefined;
  labelClassName?: string | undefined;
};

export function CLInput({ label, labelClassName, ...props }: InputProps) {
  return (
    <>
      {label && <label className={labelClassName}>{label}</label>}
      {props.type ? (
        <input type={props.type} {...props} />
      ) : (
        <input type="text" {...props} />
      )}
    </>
  );
}
