import styles from '../../../styles/ui-controls/Button.module.scss';
import CLButton, { ButtonProps } from '../default-ui-controls/button';

export function CLPrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <CLButton
      className={
        'flex justify-center items-center rounded-full text-sm px-4 py-2 disabled:opacity-60 ' +
        styles.cl_primary_btn +
        (className ? ' ' + className : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomButton({ className, ...props }: ButtonProps) {
  return (
    <CLButton
      className={
        'flex justify-center items-center rounded-full disabled:opacity-60 ' +
        styles.cl_primary_btn +
        (className ? ' ' + className : '')
      }
      {...props}
    />
  );
}

export function CLSecondaryButton({ className, ...props }: ButtonProps) {
  return (
    <CLButton
      className={
        'flex justify-center items-center rounded-full text-sm px-4 py-2 disabled:opacity-60 ' +
        styles.cl_secondary_btn +
        (className ? ' ' + className : '')
      }
      {...props}
    />
  );
}

export function CLSecondaryCustomButton({ className, ...props }: ButtonProps) {
  return (
    <CLButton
      className={
        'flex justify-center items-center rounded-full disabled:opacity-60 ' +
        styles.cl_secondary_btn +
        (className ? ' ' + className : '')
      }
      {...props}
    />
  );
}

export function CLCustomButton({ className, ...props }: ButtonProps) {
  return (
    <CLButton
      className={'disabled:opacity-60 ' + (className ? ' ' + className : '')}
      {...props}
    />
  );
}
