import { mergeProps } from 'solid-js';
import type { RequiredDefaults } from '#lib/utils';
import style from '#styles/Widget.module.scss';

export type DividerProps = {
  direction?: 'horizontal' | 'vertical';
};

const defaultProps: RequiredDefaults<DividerProps> = {
  direction: 'horizontal',
};

const Divider: Component = (unmergedProps) => {
  const props = mergeProps(defaultProps, unmergedProps);

  return (
    <div
      classList={{
        [style.divider]: true,
        [style.horizontal]: props.direction === 'horizontal',
        [style.vertical]: props.direction === 'vertical',
      }}
    />
  );
};

export default Divider;
