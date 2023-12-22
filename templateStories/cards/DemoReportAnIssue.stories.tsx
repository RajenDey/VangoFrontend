// [build] library: 'shadcn'
// [build] template: true

import { Meta, StoryObj } from "@storybook/react";

import { DemoReportAnIssue } from "@/components/templates/cards/DemoReportAnIssue";

const meta: Meta<typeof DemoReportAnIssue> = {
  title: "templates/DemoReportAnIssue",
  component: DemoReportAnIssue,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DemoReportAnIssue>;

export const Base: Story = {
  render: () => <DemoReportAnIssue />,
};
