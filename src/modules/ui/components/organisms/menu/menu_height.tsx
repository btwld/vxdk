import type { ParentComponent } from 'solid-js';
import { ConversionUtils } from '../../../../common/utils';
import { useVxdkState } from '../../../providers/hooks/use-state';
import styles from './menu_height.module.css';

const LimitMenuHeight: ParentComponent = (props) => {
  const { height } = useVxdkState();

  /**
   * Fix height size to render popover inside the video
   * @returns heightInPixel: string
   */
  const getPopoverHeight = () => {
    // Bottom margin to prevent overlay controlbar
    const bottomMarginSizeInRem = 6;
    const bottomMarginSizeInPixel = ConversionUtils.convertRemToPixels(
      bottomMarginSizeInRem,
    );
    const videoHeight = height() ?? 0;

    return `${videoHeight - bottomMarginSizeInPixel}px`;
  };

  return (
    <div
      class={styles.menu_height}
      style={{
        height: getPopoverHeight(),
      }}
    >
      {props.children}
    </div>
  );
};

export default LimitMenuHeight;
