import React from "react";
import { Pricing as PricingComponent} from "@/components/Pricing";
import { LandingHeader } from "@/components/LandingHeader";

export const Pricing = () => {
  return (
    <div>
      <LandingHeader />
      <PricingComponent />
    </div>
  );
};

export default Pricing;
