import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/templates/tasks/components/Columns";
import { DataTable } from "@/components/templates/tasks/components/DataTable";
import { UserNav } from "@/components/templates/tasks/components/TasksUserNav";
import { taskSchema } from "./data/schema";
import tasksJson from "./data/tasks.json";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
function getTasks() {
  return z.array(taskSchema).parse(tasksJson);
}

export default function TaskPage() {
  const tasks = getTasks();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
