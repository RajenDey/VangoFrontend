"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    key: string;
    title: string;
    page: any;
  }[];
  setSelectedSidebarItem: (itemKey: string) => void;
  selectedSidebarItem: string;
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => props.setSelectedSidebarItem(item.key)}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            props.selectedSidebarItem === item.key
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
}
