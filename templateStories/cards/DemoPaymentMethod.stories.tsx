// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoPaymentMethod } from "@/components/templates/cards/DemoPaymentMethod";

const meta: Meta<typeof DemoPaymentMethod> = {
  title: "templates/DemoPaymentMethod",
  component: DemoPaymentMethod,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoPaymentMethod>;

export const Base: Story = {
  render: () => <DemoPaymentMethod />,
};
