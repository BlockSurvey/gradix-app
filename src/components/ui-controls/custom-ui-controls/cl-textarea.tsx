import styles from '../../../styles/ui-controls/Input.module.scss';

import { CLTextarea, TextAreaProps } from '../default-ui-controls/textarea';

export function CLPrimaryTextarea({
  className,
  labelClassName,
  ...props
}: TextAreaProps) {
  return (
    <CLTextarea
      className={styles.cl_input_field + (className ? ' ' + className : '')}
      labelClassName={
        'mb-1 inline-block text-black/[.4] ' +
        +(labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomTextarea({
  className,
  labelClassName,
  ...props
}: TextAreaProps) {
  return (
    <CLTextarea
      className={
        styles.cl_input_custom_field + (className ? ' ' + className : '')
      }
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      {...props}
    />
  );
}
