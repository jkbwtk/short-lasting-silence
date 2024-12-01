import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';

import style from '#styles/DevGrid.module.scss';

const DevGrid: Component = () => {
  const [visible, setVisible] = createSignal(true);

  const handleEvent = (ev: KeyboardEvent) => {
    if (ev.key.toLowerCase() === 'g' && ev.shiftKey) {
      ev.preventDefault();
      setVisible((s) => !s);
    }
  };

  onMount(() => {
    document.addEventListener('keypress', handleEvent);
  });

  onCleanup(() => {
    document.removeEventListener('keypress', handleEvent);
  });

  return (
    <Portal>
      <Show when={visible()}>
        <div class={style.devGrid} />
      </Show>
    </Portal>
  );
};

export default DevGrid;
