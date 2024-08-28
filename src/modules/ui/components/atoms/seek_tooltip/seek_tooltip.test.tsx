import { screen, render } from 'solid-testing-library';
import SeekToolTip from './seek_tooltip';

describe('SeekToolTipComponent', () => {
  it('should render with props show equals true', async () => {
    let ref: HTMLDivElement;

    render(() => (
      <SeekToolTip ref={ref} position={10} show>
        tooltip
      </SeekToolTip>
    ));

    const component = await screen.findByTestId('seek_tooltip');

    expect(component).toBeInTheDocument();
  });

  it('should render with style left position', async () => {
    let ref: HTMLDivElement;
    const position = 10;
    render(() => (
      <SeekToolTip ref={ref} position={position} show>
        tooltip
      </SeekToolTip>
    ));

    const component = await screen.findByTestId('seek_tooltip');

    expect(component).toBeInTheDocument();
    expect(component).toHaveStyle({
      left: `${position}%`,
    });
  });
});
