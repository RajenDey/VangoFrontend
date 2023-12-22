import Link from "next/link";
import React from "react";

export const Landing = () => {
  return (
    <div className="landing" style={{ width: "100vw", height: "100vh" }}>
      <div className="bg-[#100D18]">
        <section className="relative h-screen pt-52 pb-10 sm:pt-60 sm:pb-16 lg:pb-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold sm:text-6xl">
                <span className="text-white bg-clip-text">
                  Build and Share Diffusion Model Workflows
                </span>
              </h1>

              <Link
                href="/login"
                title=""
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                Get Started For Free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
