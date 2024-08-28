import { screen, render, fireEvent } from 'solid-testing-library';
import SubMenu from './sub_menu';

describe('SubMenuComponent', () => {
  const mockOnClose = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(async () => {
    render(() => (
      <SubMenu
        onClose={mockOnClose}
        onChange={mockOnChange}
        label="Level"
        options={[
          {
            key: 'level1',
            label: 'Level 1',
            active: false,
          },
        ]}
      />
    ));
  });

  it('should execute function on click in close button', async () => {
    const subMenuCloseButtonElement = await screen.findByRole('button');

    expect(subMenuCloseButtonElement).toBeInTheDocument();

    fireEvent.click(subMenuCloseButtonElement);

    expect(mockOnClose.mock.calls.length).toEqual(1);
  });

  it('should execute function on click in submenu option', async () => {
    const subMenuOptionLabelElement = await screen.findByTestId(
      'submenu_option_input_0',
    );

    expect(subMenuOptionLabelElement).toBeInTheDocument();

    fireEvent.click(subMenuOptionLabelElement);

    expect(mockOnChange.mock.calls.length).toEqual(1);
  });
});
