import type { Component, JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { BrowserUtils, ConversionUtils } from '../../../../common/utils';
import InputRange from '../../atoms/input_range/input_range';
import SeekToopTip from '../../atoms/seek_tooltip/seek_tooltip';

interface SeekbarProps {
  duration: number;
  value: number;
  valueBuffer: number;
  onValueChange: (value: number) => void;
}

type MouseMoveEvent = JSX.EventHandlerUnion<HTMLElement, MouseEvent>;

const Seekbar: Component<SeekbarProps> = (props) => {
  const [mousePosPercentage, setMousePosPercentage] = createSignal(0);
  const [tooltipPosPercentage, setTooltipPosPercentage] = createSignal(0);
  const [showTooltip, setShowTooltip] = createSignal(false);

  let tooltipRef!: HTMLDivElement;
  let inputRangeRef!: HTMLInputElement;

  const handleMouseMove: MouseMoveEvent = (ev) => {
    const rect = ev.target.getBoundingClientRect();

    // Return if tooltipref is not defined
    if (!tooltipRef) return;

    const tooltipWidth = tooltipRef.getBoundingClientRect().width;
    const inputRangeWidth = inputRangeRef.getBoundingClientRect().width;

    // Mouse position
    const x = (ev as any).clientX - rect.left;
    const percentage = (x / inputRangeWidth) * 100;

    const offset = (tooltipWidth / 2 / inputRangeWidth) * 100;

    const min = tooltipWidth / 2;
    const max = inputRangeWidth - tooltipWidth / 2;

    // Check if it has gone pass the width of seekbar
    if (x >= max) {
      if (percentage <= 100) {
        setMousePosPercentage(percentage);
      } else {
        setMousePosPercentage(100);
      }
      setTooltipPosPercentage(
        (100 * (inputRangeWidth - tooltipWidth)) / inputRangeWidth,
      );
    } else if (x <= min) {
      setTooltipPosPercentage(0);
      // Check if its out of bounds
      if (x >= 0) {
        setMousePosPercentage(percentage);
      } else {
        setMousePosPercentage(0);
      }
    } else {
      setTooltipPosPercentage(Math.abs(offset - percentage));

      setMousePosPercentage(percentage);
    }
  };

  const onValueChange = (value: number) => {
    // Send mouse position percentage so value changed
    // matches display time.
    const updatedValue =
      mousePosPercentage() === 0 ? value : mousePosPercentage();
    props.onValueChange(updatedValue);
  };

  const currentTimeValue = () =>
    ConversionUtils.secondsToHMS((mousePosPercentage() / 100) * props.duration);

  return (
    <div
      class="w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SeekToopTip
        show={!BrowserUtils.isMobile && showTooltip()}
        ref={tooltipRef}
        position={tooltipPosPercentage()}
      >
        {currentTimeValue()}
      </SeekToopTip>

      <InputRange
        ref={inputRangeRef}
        onValueChange={onValueChange}
        valueBuffer={props.valueBuffer}
        value={props.value}
        step={0.001}
        theme="primary"
      />
    </div>
  );
};

export default Seekbar;
