// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoGithub } from "@/components/templates/cards/DemoGithub";

const meta: Meta<typeof DemoGithub> = {
  title: "templates/DemoGithub",
  component: DemoGithub,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoGithub>;

export const Base: Story = {
  render: () => <DemoGithub />,
};
