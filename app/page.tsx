import { LoginButton } from "@/components/auth/LoginButon";
import { Button } from "@/components/ui/button";
import React from "react";

const LoginPage = () => {
  return (
    <LoginButton>
      <Button size="lg">Войти</Button>
    </LoginButton>
  );
};

export default LoginPage;
