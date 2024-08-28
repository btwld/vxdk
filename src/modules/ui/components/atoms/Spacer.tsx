import type { Component } from 'solid-js';

interface SpacerProps {
  size?: number | string;
}
const Spacer: Component<SpacerProps> = (props) => {
  return (
    <div
      data-testid="Spacer"
      style={{
        width: props.size ? `${props.size}px` : '0.5rem',
        height: props.size ? `${props.size}px` : '0.5rem',
      }}
    />
  );
};

export default Spacer;
