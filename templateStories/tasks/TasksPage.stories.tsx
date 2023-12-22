// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import TasksPage from "@/components/templates/tasks/TasksPage";

const meta: Meta<typeof TasksPage> = {
  title: "templates/Dashboard",
  component: TasksPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TasksPage>;

export const Base: Story = {
  render: () => <TasksPage />,
  args: {},
};
