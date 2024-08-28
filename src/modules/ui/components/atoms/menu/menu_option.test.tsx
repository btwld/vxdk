import { fireEvent, render, screen } from 'solid-testing-library';
import MenuOption from './menu_option';

describe('MenuOptionComponent', () => {
  it('should render a menu option', async () => {
    render(() => <MenuOption onPress={() => {}} label="Click me!" />);

    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('should execute function on click', async () => {
    const mockOnClick = jest.fn();

    render(() => <MenuOption onPress={mockOnClick} label="menu-option" />);

    const component = await screen.findByRole('button');

    expect(component).toBeInTheDocument();

    fireEvent.click(component);

    expect(mockOnClick.mock.calls.length).toEqual(1);
  });
});
