import React from "react";
import { PricingOptions } from "./PricingOptions";

export const Pricing = () => {

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
    <section className="py-12 bg-[#100D18] sm:py-16 lg:py-20 xl:py-24 min-h-screen min-w-full">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          Coming soon
        </h2>
        <p className="mt-4 text-xl text-gray-400">
          Email rajen@vango.ai for questions or early access
        </p>
        
        <p className="mt-6 text-lg font-normal text-gray-400">
          {/* Amet minim mollit non deserunt ullamco. */}
        </p>
      </div>
      {/* <PricingOptions currentPlan=""/> */}
    </div>
  </section>
  );
}
