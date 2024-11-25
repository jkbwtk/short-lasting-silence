import type { Meta, StoryObj } from 'storybook-solidjs';
import WidgetTest from '#components/WidgetTest';

import '#styles/index.scss';

const meta = {
  title: 'Components/WidgetTest',
  component: WidgetTest,
} as Meta<typeof WidgetTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
