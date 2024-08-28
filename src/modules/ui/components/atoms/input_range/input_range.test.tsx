import { fireEvent, render, screen } from 'solid-testing-library';
import InputRange from './input_range';

describe('InputRange Component', () => {
  let sliderElem: HTMLInputElement;
  const mockOnValueChange = jest.fn();

  beforeEach(async () => {
    render(() => <InputRange onValueChange={mockOnValueChange} />);
    sliderElem = (await screen.findByTestId('input_range')) as HTMLInputElement;
  });

  it('should render', async () => {
    expect(sliderElem).toBeInTheDocument();
  });

  it('should update value when input value changes', async () => {
    fireEvent.change(sliderElem, { target: { value: '50' } });

    expect(sliderElem.value).toContain('50');
  });
});
