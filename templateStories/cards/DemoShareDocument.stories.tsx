// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoShareDocument } from "@/components/templates/cards/DemoShareDocument";

const meta: Meta<typeof DemoShareDocument> = {
  title: "templates/DemoShareDocument",
  component: DemoShareDocument,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoShareDocument>;

export const Base: Story = {
  render: () => <DemoShareDocument />,
};
