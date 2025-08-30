import { TextareaHTMLAttributes } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLElement> & {
  label?: string | undefined;
  labelClassName?: string | undefined;
};

export function CLTextarea({ label, labelClassName, ...props }: TextAreaProps) {
  return (
    <>
      {label && <label className={labelClassName}>{label}</label>}
      <textarea {...props} />
    </>
  );
}
