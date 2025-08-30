import { SelectHTMLAttributes } from 'react';

export type SelectOptionProps = SelectHTMLAttributes<HTMLElement> & {
  label?: string | undefined;
  labelClassName?: string | undefined;
};

export function CLSelectOption({
  label,
  labelClassName,
  ...props
}: SelectOptionProps) {
  return (
    <>
      {label && <label className={labelClassName}>{label}</label>}
      <select {...props} />
    </>
  );
}
