import { fireEvent, render, screen } from 'solid-testing-library';
import VolumeControl from './volume_control';

describe('VolumeControlComponent', () => {
  it('should render a VolumeControl', async () => {
    render(() => (
      <VolumeControl
        volume={0}
        muted={false}
        onVolumeChange={() => {}}
        toggleMute={() => {}}
      />
    ));

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call toggleMute on click in button', () => {
    const toggleMute = jest.fn();

    render(() => (
      <VolumeControl
        volume={0}
        muted={false}
        onVolumeChange={() => {}}
        toggleMute={toggleMute}
      />
    ));

    fireEvent.click(screen.getByRole('button'));

    fireEvent.mouseEnter(screen.getByRole('button'));

    expect(toggleMute).toHaveBeenCalledTimes(1);
  });

  it('should toggle volume bar display on hover', async () => {
    const toggleMute = jest.fn();
    render(() => (
      <VolumeControl
        volume={0}
        muted={false}
        onVolumeChange={() => {}}
        toggleMute={toggleMute}
      />
    ));

    fireEvent.mouseEnter(screen.getByTestId('volume_control'));

    expect(screen.getByTestId('container_volume_bar')).toHaveClass('w-20');

    fireEvent.mouseLeave(screen.getByTestId('volume_control'));

    expect(screen.getByTestId('container_volume_bar')).toHaveClass(
      'opacity-0',
      'w-1',
    );
  });
});
