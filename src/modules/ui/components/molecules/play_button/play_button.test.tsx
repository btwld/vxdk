import { screen, render, fireEvent } from 'solid-testing-library';

import PlayButton from './play_button';

describe('PlayButtonComponent', () => {
  it('should render button correct aria-label with falsy isPlaying prop', () => {
    render(() => <PlayButton isPlaying={false} onPress={() => {}} />);

    expect(screen.getByLabelText('button.play')).toBeInTheDocument();
  });

  it('should render button correct aria-label with truthy isPlaying prop', () => {
    render(() => <PlayButton isPlaying={true} onPress={() => {}} />);

    expect(screen.getByLabelText('button.pause')).toBeInTheDocument();
  });

  it('should call onPress on click in button', () => {
    const onPress = jest.fn();
    render(() => <PlayButton isPlaying={true} onPress={onPress} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
