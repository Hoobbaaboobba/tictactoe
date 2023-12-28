"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignInOAuthButtons } from "./GoogleProvider";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };
  return (
    <div className="py-8">
      <form className="flex flex-col gap-4 shadow-md rounded-md p-8 justify-center items-center">
        <h1 className="text-2xl text-center font-bold">
          Снова рад тебя <br /> видеть!
        </h1>
        <div>
          <Input
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            name="email"
            type="email"
            placeholder="Почта"
          />
        </div>
        <div>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <Button onClick={handleSubmit}>Войти</Button>
          <SignInOAuthButtons />
        </div>
      </form>
    </div>
  );
}
