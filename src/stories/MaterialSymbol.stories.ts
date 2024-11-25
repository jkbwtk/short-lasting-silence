import type { Meta, StoryObj } from 'storybook-solidjs';
import MaterialSymbol from '#components/MaterialSymbol';
import { MaterialSymbol as SupportedMaterialSymbols } from '#lib/supportedMaterialSymbols';

const meta = {
  title: 'Components/MaterialSymbol',
  component: MaterialSymbol,
  argTypes: {
    symbol: { control: 'select', options: SupportedMaterialSymbols },
    color: {
      control: 'select',
      options: ['gray', 'red', 'green', 'blue', 'yellow', 'primary'],
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'alt', 'medium', 'big'],
    },
    interactive: { control: 'boolean' },
    highlightColor: {
      control: 'select',
      options: ['none', 'gray', 'red', 'green', 'blue', 'yellow', 'primary'],
    },
    filled: { control: 'boolean' },
    class: { control: 'text' },
    active: { control: 'boolean' },
  },
} as Meta<typeof MaterialSymbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    symbol: 'check_box',
    color: 'primary',
    size: 'medium',
    interactive: false,
    highlightColor: 'primary',
    filled: false,
    class: '',
    active: false,
  },
};

export const Interactive: Story = {
  args: {
    symbol: 'cloud_upload',
    color: 'gray',
    size: 'big',
    interactive: true,
    highlightColor: 'green',
    filled: true,
    class: '',
    active: false,
  },
};
