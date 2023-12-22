import React from "react";
import { useRouter } from "next/router";

type PricingOptionsProps = {
    currentPlan: string;
}

export const PricingOptions = ({ currentPlan }: PricingOptionsProps) => {
  const router = useRouter();
  const currentRoute = router.asPath;

  const plans = [
    {
      name: "Free",
      price: 0,
      features: [
        "Run unlimited workflows locally",
        "Create unlimited files",
        "Share links to your workflows",
        "Import your workflows from ComfyUI",
        "Export your workflows to ComfyUI",
        "Use your creations commercially",
      ]
    },
    {
      name: "Pro",
      price: 49,
      features: [
        "Run unlimited workflows locally",
        "Run 50 workflows on the cloud per day",
        "Create unlimited files",
        "Share links to your workflows",
        "Import your workflows from ComfyUI",
        "Export your workflows to ComfyUI",
        "Priority customer support",
        "Use your creations commercially",
      ]
    },
    {
      name: "Ultimate",
      price: 99,
      features: [
        "Run unlimited workflows locally",
        "Run 200 workflows on the cloud per day",
        "Purchase credits on demand",
        "Create unlimited files",
        "Share links to your workflows",
        "Import your workflows from ComfyUI",
        "Export your workflows to ComfyUI",
        "Priority customer support",
        "Use your creations commercially",
      ]
    }
  ]



  return (
      <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-12 lg:grid-cols-3 xl:gap-8 sm:mt-16 lg:max-w-6xl">
        {plans.map(plan => (
          <div key={plan.name} className="flex flex-col p-8 transition-all duration-200 transform bg-gray-900 rounded-md hover:-translate-y-2">
            
            <div className="flex-1">
              <h3 className="text-lg font-normal text-white">{plan.name}</h3>

              <div className="flex items-end mt-3">
                <p className="text-6xl font-normal text-white">${plan.price}</p>
                
                <p className="ml-1 text-base font-normal text-gray-500">
                  / month
                </p>
              </div>

              <hr className="mt-8 border-gray-800" />

              <ul className="mt-8 space-y-5">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    
                    <span className="ml-2 text-base font-normal text-white">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative flex items-center justify-center mt-8 group">
              <div className="absolute transition-all duration-200 rounded-md -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 "></div>
              

              {
                plan.name === "Free" ?
                  currentPlan === "Free" ?
                    <button
                      className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white bg-gray-900 border border-transparent rounded-md group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                      role="button"
                    >
                        Active
                    </button>
                    :
                    <button
                        className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white bg-gray-900 border border-transparent rounded-md group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                        role="button"
                        onClick={() => {router.push(`/login`)}}
                    >
                        Get Started
                    </button>
                  :
                  <button
                    className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white bg-gray-900 border border-transparent rounded-md"
                    role="button"
                    disabled
                  >
                    Coming soon
                  </button>
              }
            </div>
          </div>  
        ))}
      </div>
  );
}
