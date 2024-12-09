import { Portal } from 'solid-js/web';
import { cuId } from '#lib/consoleUnitUtils';
import style from '#styles/ConsoleUnitPrototype.module.scss';

const ConsoleUnitPrototype: Component = () => {
  return (
    <Portal>
      <div class={style.prototype} id={cuId} aria-hidden="true" />
    </Portal>
  );
};

export default ConsoleUnitPrototype;
