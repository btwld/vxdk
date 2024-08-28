import { fireEvent, render, screen } from 'solid-testing-library';
import { VolumeButton } from './volume_button';

describe('VolumeButtonComponent', () => {
  it('should render a VolumeButton', async () => {
    render(() => <VolumeButton volume={10} muted={false} onPress={() => {}} />);

    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('should render a VolumeButton with VolumeMediumIcon', async () => {
    render(() => <VolumeButton volume={10} muted={false} onPress={() => {}} />);

    expect(screen.getByTestId('volume_medium')).toBeInTheDocument();
  });

  it('should render a VolumeButton with VolumeOffIcon', async () => {
    render(() => <VolumeButton volume={0} muted={false} onPress={() => {}} />);

    expect(screen.getByTestId('volume_off')).toBeInTheDocument();
  });

  it('should render a VolumeButton with VolumeHighIcon', async () => {
    render(() => <VolumeButton volume={40} muted={false} onPress={() => {}} />);

    expect(screen.getByTestId('volume_high')).toBeInTheDocument();
  });

  it('should call onPress on click in button', () => {
    const onPress = jest.fn();

    render(() => <VolumeButton volume={10} muted={false} onPress={onPress} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
