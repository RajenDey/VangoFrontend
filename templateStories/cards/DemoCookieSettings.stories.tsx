// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoCookieSettings } from "@/components/templates/cards/DemoCookieSettings";

const meta: Meta<typeof DemoCookieSettings> = {
  title: "templates/DemoCookieSettings",
  component: DemoCookieSettings,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoCookieSettings>;

export const Base: Story = {
  render: () => <DemoCookieSettings />,
};
