import React from "react";

import { Metadata } from "next";
import Image from "next/image";

import { MainNav } from "@/components/templates/dashboard/MainNav";
import { UserNav } from "@/components/templates/dashboard/DashboardUserNav";

export const Header = () => {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <MainNav className="mx-6" />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
