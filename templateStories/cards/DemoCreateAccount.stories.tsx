// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoCreateAccount } from "@/components/templates/cards/DemoCreateAccount";

const meta: Meta<typeof DemoCreateAccount> = {
  title: "templates/DemoCreateAccount",
  component: DemoCreateAccount,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoCreateAccount>;

export const Base: Story = {
  render: () => <DemoCreateAccount />,
};
