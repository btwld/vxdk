import type { Component, ParentComponent } from 'solid-js';
import { Show, createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';

import styles from './modal.module.css';

interface ModalBackdropProps {
  onClick: () => void;
  testId?: string;
}

interface ModalHeaderProps {
  headerTitle?: string;
}

interface ModalProps {
  headerTitle?: string;
  onClose: () => void;
}

const ModalBackdrop: ParentComponent<ModalBackdropProps> = (props) => {
  const [backdropRef, setBackdropRef] = createSignal<HTMLDivElement>();

  const onClickSelf = (event: Event) => {
    const isSelf = backdropRef() === (event.target as Node);

    if (isSelf) {
      props.onClick();
    }
  };

  return (
    <div
      ref={setBackdropRef}
      data-testid={props.testId}
      class={styles.backdrop}
      onClick={onClickSelf}
    >
      {props.children}
    </div>
  );
};

const ModalHeader: Component<ModalHeaderProps> = (props) => {
  return (
    <div>
      <h2 class={styles.modal_title}>{props.headerTitle}</h2>
    </div>
  );
};

const Modal: ParentComponent<ModalProps> = (props) => {
  return (
    <Portal>
      <ModalBackdrop testId="modal_backdrop" onClick={props.onClose}>
        <div data-testid="modal_content" class={styles.content}>
          <Show when={props.headerTitle}>
            <ModalHeader headerTitle={props.headerTitle} />
          </Show>
          <div>{props.children}</div>
        </div>
      </ModalBackdrop>
    </Portal>
  );
};

export default Modal;
