import type { Component } from 'solid-js';
import InputRange from '../input_range/input_range';

export interface VolumeBarProps {
  onVolumeChange: (volume: number) => void;
  value: number;
  muted: boolean;
}

export const VolumeBar: Component<VolumeBarProps> = (props) => {
  const value = () => (props.muted ? 0 : props.value);
  return (
    <InputRange
      onValueChange={props.onVolumeChange}
      value={value()}
      step={0.01}
      theme="white"
    />
  );
};

export default VolumeBar;
