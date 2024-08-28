import { screen, render, fireEvent } from 'solid-testing-library';

import Select from './select';

describe('SelectComponent', () => {
  const options = [
    {
      label: 'Option 1',
      key: 'option-1',
    },
    {
      label: 'Option 2',
      key: 'option-2',
    },
  ];

  it('should render select', async () => {
    render(() => <Select testId="select" onChange={() => {}} options={[]} />);

    const component = await screen.findByTestId('select');

    expect(component).toBeInTheDocument();
  });

  it('should select render options', async () => {
    render(() => (
      <Select testId="select" onChange={() => {}} options={options} />
    ));

    const component = await screen.findByTestId('select');

    expect(component).toBeInTheDocument();
    expect(component.children.length).toBe(2);
  });

  it('should change select value to the second option', async () => {
    render(() => (
      <Select testId="select" onChange={() => {}} options={options} />
    ));

    const component = (await screen.findByTestId(
      'select',
    )) as HTMLSelectElement;

    fireEvent.change(component, { target: { value: options[1].key } });

    expect(component.value).toEqual(options[1].key);
  });
});
