import { mergeProps } from 'solid-js';
import type { MaterialSymbol as MaterialSymbolType } from '#lib/supportedMaterialSymbols';
import { type RequiredDefaults, quickSwitch } from '#lib/utils';

import style from '#styles/MaterialSymbol.module.scss';

export type SymbolColorType =
  | 'gray'
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'primary';
export type SymbolHighlightColorType = SymbolColorType | 'none';
export type SymbolSizeType = 'tiny' | 'small' | 'alt' | 'medium' | 'big';

export type MaterialSymbolProps = {
  symbol: MaterialSymbolType;
  color?: SymbolColorType;
  size?: SymbolSizeType;
  interactive?: boolean;
  highlightColor?: SymbolHighlightColorType;
  filled?: boolean;
  class?: string;
  active?: boolean;
};

const defaultProps: RequiredDefaults<MaterialSymbolProps> = {
  color: 'gray',
  size: 'medium',
  interactive: false,
  highlightColor: 'none',
  filled: false,
  class: '',
  active: false,
};

const MaterialSymbol: Component<MaterialSymbolProps> = (userProps) => {
  const props = mergeProps(defaultProps, userProps);

  const colorClass = quickSwitch<string, SymbolColorType>(props.color, {
    gray: style.gray,
    red: style.red,
    green: style.green,
    blue: style.blue,
    yellow: style.yellow,
    primary: style.primary,
    default: style.gray,
  });

  const highlightColorClass = quickSwitch<string, SymbolHighlightColorType>(
    props.highlightColor,
    {
      gray: style.grayHighlight,
      red: style.redHighlight,
      green: style.greenHighlight,
      blue: style.blueHighlight,
      yellow: style.yellowHighlight,
      primary: style.primaryHighlight,

      none: '__ms_no_h__',
      default: '__ms_no_h__',
    },
  );

  const sizeClass = quickSwitch<string, SymbolSizeType>(props.size, {
    tiny: style.tiny,
    small: style.small,
    alt: style.alt,
    medium: style.medium,
    big: style.big,
    default: style.medium,
  });

  style.red;

  return (
    <span
      classList={{
        [style.materialSymbol]: true,
        [colorClass]: true,
        [sizeClass]: true,
        [style.interactive]: props.interactive,
        [highlightColorClass]: props.interactive,
        [style.filled]: props.filled,
        [style.active]: props.active,
        [props.class]: true,
      }}
    >
      {props.symbol}
    </span>
  );
};

export default MaterialSymbol;
