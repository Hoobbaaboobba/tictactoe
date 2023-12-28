"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignInOAuthButtons } from "./GoogleProvider";
import Link from "next/link";

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
      <form className="flex border-2 dark:border-white w-[400px] flex-col gap-4 shadow-md rounded-md p-8 justify-center items-center">
        <h1 className="text-2xl text-center font-bold">
          Снова рад тебя <br /> видеть!
        </h1>
        <div className="w-full">
          <Input
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            name="email"
            type="email"
            placeholder="Почта"
          />
        </div>
        <div className="w-full">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Войти
        </Button>
        <div className="w-full flex justify-center items-center gap-3">
          <Link href="/sign-up" className="text-sm">
            Нет аккаунта?
          </Link>
          <SignInOAuthButtons />
        </div>
      </form>
    </div>
  );
}
