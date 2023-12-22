// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoNotifications } from "@/components/templates/cards/DemoNotifications";

const meta: Meta<typeof DemoNotifications> = {
  title: "templates/DemoNotifications",
  component: DemoNotifications,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoNotifications>;

export const Base: Story = {
  render: () => <DemoNotifications />,
};
