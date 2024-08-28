import { screen, render } from 'solid-testing-library';

import Seekbar from './seekbar';

describe('SeekbarComponent', () => {
  it('should render a Seekbar', async () => {
    render(() => (
      <Seekbar
        duration={0}
        value={0}
        valueBuffer={0}
        onValueChange={() => {}}
      />
    ));

    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
