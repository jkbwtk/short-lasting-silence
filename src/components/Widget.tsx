import type { JSX, ValidComponent } from 'solid-js';
import { Dynamic, type DynamicProps } from 'solid-js/web';
import style from '#styles/Widget.module.scss';

type Widget<T extends ValidComponent> = Omit<DynamicProps<T>, 'component'> & {
  title: string;
  component?: T;
  children?: JSX.Element;
};

function Widget<T extends ValidComponent = 'div'>(props: Widget<T>) {
  return (
    <Dynamic
      {...props}
      component={props.component ?? 'div'}
      classList={{
        [style.container]: true,
        [props.class ?? '']: true,
        ...(props.classList ?? {}),
      }}
    >
      <div class={style.border} />
      <div class={style.title}>{props.title}</div>

      {props.children}
    </Dynamic>
  );
}

export default Widget;
