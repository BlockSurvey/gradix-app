import styles from '../../../styles/ui-controls/Input.module.scss';
import {
  CLSelectOption,
  SelectOptionProps
} from '../default-ui-controls/select-option';

export function CLPrimarySelectOption({
  className,
  labelClassName,
  ...props
}: SelectOptionProps) {
  return (
    <CLSelectOption
      className={styles.cl_input_field + (className ? ' ' + className : '')}
      labelClassName={
        'mb-1 inline-block text-black/[.4] ' +
        +(labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomSelectOption({
  className,
  labelClassName,
  ...props
}: SelectOptionProps) {
  return (
    <CLSelectOption
      className={styles.cl_input_field + (className ? ' ' + className : '')}
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLCustomSelectOption({
  className,
  labelClassName,
  ...props
}: SelectOptionProps) {
  return (
    <CLSelectOption
      className={className ? ' ' + className : ''}
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}
