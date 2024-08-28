import { screen, render, fireEvent } from 'solid-testing-library';
import Button from './button';

describe('ButtonComponent', () => {
  it('should render a button', async () => {
    const mockOnClick = jest.fn();

    render(() => <Button onClick={mockOnClick}>Click me!</Button>);

    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('should execute function on click', async () => {
    const mockOnClick = jest.fn();

    render(() => <Button onClick={mockOnClick}>Click me!</Button>);

    const component = await screen.findByRole('button', { name: 'Click me!' });

    expect(component).toBeInTheDocument();

    fireEvent.click(component);

    expect(mockOnClick.mock.calls.length).toEqual(1);
  });
});
