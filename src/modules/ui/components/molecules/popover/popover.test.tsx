import { screen, render } from 'solid-testing-library';

import Popover from './popover';

describe('PopoverComponent', () => {
  it('should render a popover children', async () => {
    const isOpen = () => true;

    render(() => (
      <Popover isOpen={isOpen} popoverBody="Popover Content">
        <button>Popover Children</button>
      </Popover>
    ));

    expect(screen.getByText('Popover Children')).toBeInTheDocument();
  });

  it('should render content on opened popover', async () => {
    const isOpen = () => true;

    render(() => (
      <Popover isOpen={isOpen} popoverBody="Popover Content">
        <button>Popover Children</button>
      </Popover>
    ));

    const popoverContent = screen.getByText('Popover Content');

    expect(popoverContent).toBeInTheDocument();
  });

  it('should not render content on popover closed', async () => {
    const isOpen = () => false;

    render(() => (
      <Popover isOpen={isOpen} popoverBody="Popover Content">
        <button>Popover Children</button>
      </Popover>
    ));

    const popoverContent = screen.queryAllByText('Popover Content');

    expect(popoverContent.length).toBe(0);
  });
});
