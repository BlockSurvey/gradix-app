import styles from '../../../styles/ui-controls/Input.module.scss';
import { CLDate, DateProps } from '../default-ui-controls/date';

export function CLPrimaryDate({
  className,
  labelClassName,
  ...props
}: DateProps) {
  return (
    <CLDate
      className={styles.cl_input_field + (className ? ' ' + className : '')}
      labelClassName={
        'mb-1 inline-block text-black/[.4] ' +
        +(labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomDate({
  className,
  labelClassName,
  ...props
}: DateProps) {
  return (
    <CLDate
      className={styles.cl_input_field + (className ? ' ' + className : '')}
      labelClassName={
        'mb-1 inline-block ' + +(labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}
