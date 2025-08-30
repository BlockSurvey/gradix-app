import { CLLabel, LabelProps } from '../default-ui-controls/label';

type CustomLabelProps = LabelProps & {
  children: React.ReactNode;
};

export function CLPrimaryLabel({
  children,
  className,
  ...props
}: CustomLabelProps) {
  return (
    <CLLabel
      label={children}
      className={
        'mb-1 inline-block text-black/[.4] ' +
        +(className ? ' ' + className : '')
      }
      {...props}
    />
  );
}

export function CLPrimaryCustomLabel({
  children,
  className,
  ...props
}: CustomLabelProps) {
  return <CLLabel label={children} className={className || ' '} {...props} />;
}
