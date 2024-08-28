import { screen, render } from 'solid-testing-library';

import FieldSelect from './field_select';

describe('FieldSelectComponent', () => {
  it('should render label', () => {
    const labelText = 'label';

    render(() => (
      <FieldSelect
        label={labelText}
        options={[]}
        value="1"
        onChange={() => {}}
      />
    ));

    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
  });
});
