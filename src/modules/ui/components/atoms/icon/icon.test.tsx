import type { JSX } from 'solid-js';
import { render, screen } from 'solid-testing-library';
import Icon from './icon';

describe('IconComponent', () => {
  it('should render svg with custom size', async () => {
    render(() => (
      <Icon
        icon={(props) => (
          <svg data-testid="icon" style={props.style as JSX.CSSProperties}>
            svg
          </svg>
        )}
        size={40}
      />
    ));

    const component = await screen.findByTestId('icon');

    expect(component).toBeInTheDocument();
    expect(component).toHaveStyle({
      height: '40px',
      width: '40px',
    });
  });
});
