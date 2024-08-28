import type { Component } from 'solid-js';
import { createSignal, For, onMount, Show } from 'solid-js';
import type { Controller, Options } from '../main';
import Vxdk from '../main';

const streams = [
  {
    name: 'Test Stream',
    src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  },
  {
    name: 'Parkour',
    src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  },
  {
    name: 'Big Buck Bunny HLS',
    src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  },

  {
    name: 'Sintel',
    src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
  {
    name: 'Live',
    src: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  },
  {
    name: 'MultiCDN Tester',
    src: 'playlist.m3u8',
  },
];

const VxdkApp: Component = () => {
  const [show, setShow] = createSignal(false);

  const [src, setSrc] = createSignal(streams[0].src);

  function onToggle() {
    setShow(!show());
  }

  const onSelectSrc = (ev: any) => {
    setSrc((ev.target as HTMLSelectElement).value);
  };

  const options = (): Partial<Options> => ({
    source: src(),
    autoPlay: true,
  });

  return (
    <div class="h-full w-full flex flex-col p-4">
      <div>
        <button
          type="button"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onToggle}
        >
          {show() ? 'Hide' : 'Show'}
        </button>
      </div>

      <div>
        <select value={src()} onChange={onSelectSrc}>
          <For each={streams}>
            {(stream) => <option value={stream.src}>{stream.name}</option>}
          </For>
        </select>
      </div>
      <div class="flex-1">
        <div class="relative min-h-16 border border-blue-200">
          <Show when={show()}>
            <VxdkView options={options()} />
          </Show>
        </div>
      </div>
    </div>
  );
};

interface VxdkViewProps {
  options: Partial<Options>;
}
export const VxdkView: Component<VxdkViewProps> = (props) => {
  const [_controller, _setController] = createSignal<Controller>();
  let divRef: HTMLDivElement;

  onMount(() => {
    const vxdk = Vxdk.init(divRef, props.options);
    vxdk.load();
    _setController(vxdk);
  });

  return <div ref={(el) => (divRef = el)} />;
};

export default VxdkApp;
