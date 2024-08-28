import { fireEvent, render, screen } from 'solid-testing-library';
import TooltipIconButton from './tooltip_icon_button';

describe('TooltipIconButtonComponent', () => {
  it('should render a TooltipIconButton', async () => {
    render(() => <TooltipIconButton onClick={() => {}} label="button_test" />);

    expect(screen.getByLabelText('button_test')).toBeInTheDocument();
  });

  it('should call onPress on click in button', () => {
    const onPress = jest.fn();
    render(() => <TooltipIconButton onClick={onPress} label="button_test" />);

    fireEvent.click(screen.getByLabelText('button_test'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
