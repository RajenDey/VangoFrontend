import * as React from "react";
import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/templates/forms/components/SidebarNav";
import SettingsDisplayPage from "@/components/templates/forms/display/SettingsDisplayPage";
import SettingsNotificationsPage from "@/components/templates/forms/notifications/SettingsNotificationsPage";
import SettingsAppearancePage from "@/components/templates/forms/appearance/SettingsAppearancePage";
import SettingsAccountPage from "@/components/templates/forms/account/SettingsAccountPage";
import SettingsProfilePage from "@/components/templates/forms/SettingsProfilePage";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    key: "profile",
    page: <SettingsProfilePage />,
  },
  {
    title: "Account",
    key: "account",
    page: <SettingsAccountPage />,
  },
  {
    title: "Appearance",
    key: "appearance",
    page: <SettingsAppearancePage />,
  },
  {
    title: "Notifications",
    key: "notifications",
    page: <SettingsNotificationsPage />,
  },
  {
    title: "Display",
    key: "display",
    page: <SettingsDisplayPage />,
  },
];

export default function FormsPage() {
  const [selectedSidebarItem, setSelectedSidebarItem] =
    React.useState("profile");

  const selectedItem = sidebarNavItems.find((item) => {
    return item.key === selectedSidebarItem;
  });

  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav
              items={sidebarNavItems}
              setSelectedSidebarItem={setSelectedSidebarItem}
              selectedSidebarItem={selectedSidebarItem}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{selectedItem?.page}</div>
        </div>
      </div>
    </>
  );
}
