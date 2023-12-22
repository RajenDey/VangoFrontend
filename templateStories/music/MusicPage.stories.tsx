// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import MusicPage from "@/components/templates/music/MusicPage";

const meta: Meta<typeof MusicPage> = {
  title: "templates/MusicPage",
  component: MusicPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MusicPage>;

export const Base: Story = {
  render: () => <MusicPage />,
};
