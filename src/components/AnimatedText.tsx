import { createEffect, createSignal, type JSX } from 'solid-js';

import style from '#styles/AnimatedText.module.scss';

export interface AnimatedTextProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
}

const AnimatedText: Component<AnimatedTextProps> = (props) => {
  let timeout: ReturnType<typeof setTimeout>;

  const [isRefreshing, setIsRefreshing] = createSignal(false);
  const [bufferedValue, setBufferedValue] = createSignal<string | number>(
    props.value,
  );

  createEffect(() => {
    const newValue = props.value;

    if (newValue !== bufferedValue()) {
      clearTimeout(timeout);
      setIsRefreshing(true);

      timeout = setTimeout(() => {
        setBufferedValue(newValue);
        setIsRefreshing(false);
      }, 300);
    }
  });

  return (
    <span
      {...props}
      classList={{
        [style.container]: true,
        [props.class]: true,
        [style.blur]: isRefreshing(),
      }}
    >
      {bufferedValue()}
    </span>
  );
};

export default AnimatedText;
