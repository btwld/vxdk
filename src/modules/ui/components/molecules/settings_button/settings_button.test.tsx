import { screen, render, fireEvent } from 'solid-testing-library';
import SettingsButton from './settings_button';

describe('SettingsButtonComponent', () => {
  it('should render a SettingsButton', async () => {
    render(() => <SettingsButton onPress={() => {}} isActive={false} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onPress on click in button', () => {
    const onPress = jest.fn();
    render(() => <SettingsButton onPress={onPress} isActive={false} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
