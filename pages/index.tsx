import { Inter } from "next/font/google";
import { Landing } from "../components/Landing";
import { LandingHeader } from "../components/LandingHeader";
import { useEffect, useState } from "react";
import { isLoggedIn } from "@/api/auth";
import Dashboard from "../components/Dashboard";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const setAuth = async () => {
      setLoggedIn(await isLoggedIn());
    }
    setAuth().then(() => {
      setLoading(false);
    })
  })

  if (loading) {
    return (
      <div>
      </div>
    )
  }

  if (!loggedIn) {
    return (
      <div className="Home">
        <LandingHeader />
        <div className="flex flex-row">
          <Landing />
        </div>
      </div>
    )
  } else {
    return (
      <div className="Home">
        <Dashboard />
      </div>
    )
  }
}
