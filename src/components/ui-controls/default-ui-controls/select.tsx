import Select, { Props as SelectProps } from 'react-select';

export type SelectInputProps<OptionType> = SelectProps<OptionType> & {
  label?: string | undefined;
  labelClassName?: string | undefined;
};

export function CLSelect<OptionType>({
  label,
  labelClassName,
  ...props
}: SelectInputProps<OptionType>) {
  return (
    <>
      {label && <label className={labelClassName}>{label}</label>}
      <Select {...props} />
    </>
  );
}
