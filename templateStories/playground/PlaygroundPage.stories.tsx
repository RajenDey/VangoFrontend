// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import PlaygroundPage from "@/components/templates/playground/PlaygroundPage";

const meta: Meta<typeof PlaygroundPage> = {
  title: "templates/PlaygroundPage",
  component: PlaygroundPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PlaygroundPage>;

export const Base: Story = {
  render: () => <PlaygroundPage />,
  args: {},
};
