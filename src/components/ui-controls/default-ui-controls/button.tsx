import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  href?: string | undefined;
};

export default function CLButton({ children, ...props }: ButtonProps) {
  if (props.href) {
    return <a {...props}>{children}</a>;
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
