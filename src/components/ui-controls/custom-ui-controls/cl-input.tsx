import styles from '../../../styles/ui-controls/Input.module.scss';
import { CLInput, InputProps } from '../default-ui-controls/input';

export function CLPrimaryInput({
  className,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <CLInput
      className={
        styles.cl_input_field +
        ' disabled:bg-slate-100 disabled:border-black/10 disabled:cursor-not-allowed disabled:hover:border-black/10 ' +
        (className ? ' ' + className : '')
      }
      labelClassName={
        'mb-1 inline-block text-black/[.4] ' +
        +(labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomInput({
  className,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <CLInput
      className={
        styles.cl_input_custom_field +
        ' disabled:bg-slate-100 disabled:border-black/10 disabled:cursor-not-allowed disabled:hover:border-black/10 ' +
        (className ? ' ' + className : '')
      }
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLCustomInput({
  className,
  labelClassName,
  ...props
}: InputProps) {
  return (
    <CLInput
      className={
        'disabled:bg-slate-100 disabled:border-black/10 disabled:cursor-not-allowed disabled:hover:border-black/10 ' +
        (className ? ' ' + className : '')
      }
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}
