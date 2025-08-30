import { LabelHTMLAttributes } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: React.ReactNode | undefined;
};

export function CLLabel({ label, ...props }: LabelProps) {
  return (
    <>
      <label {...props}>{label}</label>
    </>
  );
}
