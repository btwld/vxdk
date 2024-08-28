import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { BrowserUtils } from '../../../../common/utils';
import DefaultControlBar from './default_control_bar';
import SmallScreenControlBar from './small_control_bar';

const ControlBar: Component = () => {
  return (
    <Show when={!BrowserUtils.isMobile} fallback={<SmallScreenControlBar />}>
      <DefaultControlBar />
    </Show>
  );
};

export default ControlBar;
