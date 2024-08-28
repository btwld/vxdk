import type { ParentComponent } from 'solid-js';
import { mergeProps } from 'solid-js';
import { BrowserUtils } from '../../../../common/utils';
import Button from '../../atoms/button/button';
import Tooltip from '../../atoms/tooltip/tooltip';

interface TooltipIconButtonProps {
  onClick(): void;
  label: string;
  offset?: [x: number, y: number];
  isActive?: boolean;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) | undefined;
  testId?: string;
}

const TooltipIconButton: ParentComponent<TooltipIconButtonProps> = (props) => {
  const mergedProps = mergeProps({ offset: [0, 26] }, props);

  return (
    <Tooltip
      disabled={BrowserUtils.isMobile}
      label={mergedProps.label}
      initialOptions={{
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: mergedProps.offset,
            },
          },
        ],
      }}
    >
      <Button
        ref={mergedProps.ref}
        testId={mergedProps.testId}
        class="text-white"
        onClick={mergedProps.onClick}
        label={mergedProps.label}
        isActive={mergedProps.isActive}
      >
        {mergedProps.children}
      </Button>
    </Tooltip>
  );
};

export default TooltipIconButton;
