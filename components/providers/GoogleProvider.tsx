"use client";

import { AuthenticateWithRedirectCallback, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";
import { Chrome } from "lucide-react";
import { Button } from "../ui/button";

export const SignInOAuthButtons = () => {
  const { signIn } = useSignIn();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <div>
      <Button
        size="icon"
        variant="outline"
        onClick={() => signInWith("oauth_google")}
      >
        <Chrome />
      </Button>
    </div>
  );
};
