import { CLSelect, SelectInputProps } from '../default-ui-controls/select';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.isFocused
      ? '1px solid rgba(var(--secondary-color-rgb), 0.4) !important'
      : '1px solid rgba(var(--secondary-color-rgb), 0.2) !important',
    borderRadius: '12px',
    padding: '6px 5px',
    boxShadow: 'none'
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    gap: '6px'
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    fontSize: '16px'
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    fontSize: '16px',
    boxShadow: 'none'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '16px',
    backgroundColor: state.isSelected
      ? 'rgba(var(--background-rgb), 1)'
      : state.isFocused
      ? 'rgba(var(--background-rgb), 1)' // Set the background color for the highlighted option
      : provided.backgroundColor,
    color: state.isSelected
      ? 'rgba(var(--secondary-color-rgb), 1)'
      : provided.color
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    fontSize: '16px'
  }),
  multiValue: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'rgba(var(--secondary-color-rgb), 0.06)',
    fontSize: '16px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    margin: '0px'
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    fontSize: '16px',
    borderRadius: '14px'
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    padding: '4px',
    margin: '4px 4px 4px 0px',
    borderRadius: '14px'
  })
};

export function CLPrimarySelect<OptionType>({
  className,
  labelClassName,
  ...props
}: SelectInputProps<OptionType>) {
  return (
    <CLSelect
      className={className ? 'cl_select ' + className : 'cl_select'}
      labelClassName={
        'mb-1 inline-block text-black/[.4] ' +
        +(labelClassName ? ' ' + labelClassName : '')
      }
      styles={customStyles}
      {...props}
    />
  );
}

export function CLPrimaryCustomSelect<OptionType>({
  className,
  labelClassName,
  ...props
}: SelectInputProps<OptionType>) {
  return (
    <CLSelect
      className={className ? 'cl_select ' + className : 'cl_select'}
      labelClassName={
        'mb-1 inline-block ' + (labelClassName ? ' ' + labelClassName : '')
      }
      styles={customStyles}
      {...props}
    />
  );
}
