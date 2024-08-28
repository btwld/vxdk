import type { Component } from 'solid-js';
import type { SelectProps } from '../../atoms/select/select';
import Select from '../../atoms/select/select';

interface FieldSelectProps extends SelectProps {
  label: string;
}

const FieldSelect: Component<FieldSelectProps> = (props) => {
  return (
    <label class="grid gap-1 text-xs">
      {props.label}
      <Select
        testId={props.testId}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
};

export default FieldSelect;
