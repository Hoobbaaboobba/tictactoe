"use client";

import { AuthenticateWithRedirectCallback, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";
import { Chrome, Loader } from "lucide-react";
import { Button } from "../ui/button";

export const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return <Loader className="transition animate-spin" />;
  }
  const signInWithGoogle = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  return (
    <Button size="icon" variant="outline" onClick={signInWithGoogle}>
      <Chrome />
    </Button>
  );
};
