import AuthenticationPage from "@/components/templates/authentication/AuthenticationPage";
import React from "react";

export const SignInPage = () => {
  return (
    <div className="sign-in-page" style={{ width: "100vw", height: "100vh" }}>
      <AuthenticationPage />
    </div>
  );
};

export default SignInPage;
