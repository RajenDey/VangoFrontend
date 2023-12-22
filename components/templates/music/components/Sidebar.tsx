import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  tabs: { name: string; icon: React.ReactNode }[];
  currentTab: string;
  switchTab: (tab: string) => void;
}

export function Sidebar({ className, tabs, currentTab, switchTab }: SidebarProps) {

  const onTabClick = (tab: string) => {
    switchTab(tab);
  }

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {currentTab}
          </h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <Button
                key={tab.name}
                variant={currentTab === tab.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabClick(tab.name)}
              >
                {tab.icon}
                {tab.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
