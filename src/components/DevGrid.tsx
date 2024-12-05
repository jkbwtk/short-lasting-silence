import { Show, createSignal, onCleanup, onMount } from 'solid-js';

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
    <Show when={visible()}>
      <div class={style.devGrid} />
    </Show>
  );
};

export default DevGrid;
