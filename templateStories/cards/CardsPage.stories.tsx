// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import CardsPage from "@/components/templates/cards/CardsPage";

const meta: Meta<typeof CardsPage> = {
  title: "templates/CardsPage",
  component: CardsPage,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardsPage>;

export const Base: Story = {
  render: () => <CardsPage />,
  args: {},
};
