import { Metadata } from "next";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { DemoCookieSettings } from "@/components/templates/cards/DemoCookieSettings";
import { DemoCreateAccount } from "@/components/templates/cards/DemoCreateAccount";
import { DemoDatePicker } from "@/components/templates/cards/DemoDatePicker";
import { DemoGithub } from "@/components/templates/cards/DemoGithub";
import { DemoNotifications } from "@/components/templates/cards/DemoNotifications";
import { DemoPaymentMethod } from "@/components/templates/cards/DemoPaymentMethod";
import { DemoReportAnIssue } from "@/components/templates/cards/DemoReportAnIssue";
import { DemoShareDocument } from "@/components/templates/cards/DemoShareDocument";
import { DemoTeamMembers } from "@/components/templates/cards/DemoTeamMembers";

export const metadata: Metadata = {
  title: "Cards",
  description: "Examples of cards built using the components.",
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className,
      )}
      {...props}
    />
  );
}

export default function CardsPage() {
  return (
    <>
      <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <DemoCreateAccount />
          </DemoContainer>
          <DemoContainer>
            <DemoPaymentMethod />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <DemoTeamMembers />
          </DemoContainer>
          <DemoContainer>
            <DemoShareDocument />
          </DemoContainer>
          <DemoContainer>
            <DemoDatePicker />
          </DemoContainer>
          <DemoContainer>
            <DemoNotifications />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1 lg:grid-cols-2 xl:grid-cols-1">
          <DemoContainer>
            <DemoReportAnIssue />
          </DemoContainer>
          <DemoContainer>
            <DemoGithub />
          </DemoContainer>
          <DemoContainer>
            <DemoCookieSettings />
          </DemoContainer>
        </div>
      </div>
    </>
  );
}
