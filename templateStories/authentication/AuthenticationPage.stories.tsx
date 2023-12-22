// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import AuthenticationPage from "@/components/templates/authentication/AuthenticationPage";

const meta: Meta<typeof AuthenticationPage> = {
  title: "templates/AuthenticationPage",
  component: AuthenticationPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AuthenticationPage>;

export const Base: Story = {
  render: () => <AuthenticationPage />,
};
