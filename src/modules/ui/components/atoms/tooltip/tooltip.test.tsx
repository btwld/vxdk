import { screen, render, fireEvent } from 'solid-testing-library';
import Tooltip from './tooltip';

describe('TooltipComponent', () => {
  it('should render a tooltip', async () => {
    render(() => <Tooltip label="Focused">Click me!</Tooltip>);

    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('should show tooltip on focus component', async () => {
    render(() => <Tooltip label="Focused">Focus me!</Tooltip>);

    const anchorComponent = await screen.findByTestId('anchor_tooltip');

    expect(anchorComponent).toBeInTheDocument();

    fireEvent.mouseEnter(anchorComponent);

    const tooltipComponent = await screen.findByTestId('tooltip');

    expect(tooltipComponent).toBeInTheDocument();
  });

  it('should hide tooltip on blur component', async () => {
    render(() => <Tooltip label="Focused">Focus me!</Tooltip>);

    const anchorComponent = await screen.findByTestId('anchor_tooltip');

    expect(anchorComponent).toBeInTheDocument();

    fireEvent.mouseEnter(anchorComponent);

    const tooltipComponent = await screen.findByTestId('tooltip');

    expect(tooltipComponent).toBeInTheDocument();

    fireEvent.mouseLeave(anchorComponent);

    expect(tooltipComponent).not.toBeInTheDocument();
  });
});
