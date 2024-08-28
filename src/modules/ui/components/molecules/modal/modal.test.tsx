import { fireEvent, render, screen } from 'solid-testing-library';

import Modal from './modal';

describe('ModalComponent', () => {
  it('should render a modal', async () => {
    const onClose = jest.fn();

    render(() => (
      <Modal onClose={onClose} headerTitle="Modal Title">
        <p>Modal Content</p>
      </Modal>
    ));

    expect(screen.getByTestId('modal_content')).toBeInTheDocument();
  });

  it('should click outside to close modal', async () => {
    const onClose = jest.fn();

    render(() => (
      <Modal onClose={onClose} headerTitle="Modal Title">
        <p>Modal Content</p>
      </Modal>
    ));

    const modal_backdrop = screen.getByTestId('modal_backdrop');

    fireEvent.click(modal_backdrop);

    expect(onClose).toBeCalled();
  });
});
