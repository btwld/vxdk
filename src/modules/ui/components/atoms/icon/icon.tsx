import type { Component, JSX } from 'solid-js';
import { mergeProps } from 'solid-js';

interface IconsProps {
  icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
  size?: number;
  class?: string;
}

const Icon: Component<IconsProps> = (props) => {
  const mergedProps = mergeProps({ size: 24 }, props);

  return (
    <mergedProps.icon
      class={mergedProps.class}
      style={{
        height: `${mergedProps.size}px`,
        width: `${mergedProps.size}px`,
      }}
    />
  );
};

export default Icon;
