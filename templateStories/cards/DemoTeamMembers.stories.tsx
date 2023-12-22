// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoTeamMembers } from "@/components/templates/cards/DemoTeamMembers";

const meta: Meta<typeof DemoTeamMembers> = {
  title: "templates/DemoTeamMembers",
  component: DemoTeamMembers,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoTeamMembers>;

export const Base: Story = {
  render: () => <DemoTeamMembers />,
};
