import { createSignal } from 'solid-js';

const Switch = () => {
  const [status, setStatus] = createSignal(false);

  return (
    <button
      class={`flex-none appearance-none p-0.5 w-6 rounded-full b-0 bg-white transition-opacity duration-100 ${
        status() ? 'opacity-1' : 'opacity-70'
      }`}
      onClick={() => setStatus((oldStatus) => !oldStatus)}
    >
      <div
        class={`rounded-full w-2 h-2 bg-gray-900 transition-all duration-100 transform ${
          status() ? 'translate-x-3 opacity-1' : ''
        }`}
      />
    </button>
  );
};

export default Switch;
