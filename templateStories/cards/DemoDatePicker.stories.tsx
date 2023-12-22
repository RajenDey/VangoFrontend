// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoDatePicker } from "@/components/templates/cards/DemoDatePicker";

const meta: Meta<typeof DemoDatePicker> = {
  title: "templates/DemoDatePicker",
  component: DemoDatePicker,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoDatePicker>;

export const Base: Story = {
  render: () => <DemoDatePicker />,
};
