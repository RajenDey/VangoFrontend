// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import Dashboard from "@/components/templates/dashboard/Dashboard";

const meta: Meta<typeof Dashboard> = {
  title: "templates/Dashboard",
  component: Dashboard,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

export const Base: Story = {
  render: () => <Dashboard />,
  args: {},
};
