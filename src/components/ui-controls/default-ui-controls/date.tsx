import { InputHTMLAttributes } from 'react';

export type DateProps = InputHTMLAttributes<HTMLElement> & {
    label?: string | undefined;
    labelClassName?: string | undefined;
};

export function CLDate({ label, labelClassName, ...props }: DateProps) {
    return (
        <>
            {label && <label className={labelClassName}>{label}</label>}
            <input {...props} />
        </>
    );
}