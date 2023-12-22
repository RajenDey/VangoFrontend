// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import FormsPage from "@/components/templates/forms/FormsPage";

const meta: Meta<typeof FormsPage> = {
  title: "templates/FormsPage",
  component: FormsPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FormsPage>;

export const Base: Story = {
  render: () => <FormsPage />,
};
