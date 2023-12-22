// [build] library: 'shadcn'
import { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "../components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";


import { Button } from "../components/ui/button";

const meta: Meta<typeof Calendar> = {
  title: "ui/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Base: Story = {
  render: (args) => <Calendar {...args}>Calendar</Calendar>,
  args: {
    mode: "single",
    className: "rounded-md border",
  },
};

export const DatePicker: Story = {
  render: (args) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={"w-[240px] justify-start text-left font-normal"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" initialFocus />
        </PopoverContent>
      </Popover>
    );
  },
  args: {
    date: Date.parse("2023-11-3000"),
  },
};

export const DatePickerRange: Story = {
  render: (args) => {
    return (
      <div className={"grid gap-2"}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={"w-[300px] justify-start text-left font-normal"}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar initialFocus mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  args: {},
};

export const DatePickerWithPresets: Story = {
  render: (args) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={"w-[240px] justify-start text-left font-normal"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  args: {},
};
