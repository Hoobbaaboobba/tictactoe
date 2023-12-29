"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SignInOAuthButtons } from "./GoogleProvider";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // start the sign In process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      setTimeout(async () => {
        const result = await signIn.create({
          identifier: emailAddress,
          password,
        });

        setIsLoading(true);

        if (result.status === "complete") {
          console.log(result);
          await setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          /*Investigate why the login hasn't completed */
          setError(true);
          console.log(result);
        }
      }, 1000);
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
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
        <Button disabled={isLoading} onClick={handleSubmit} className="w-full">
          {isLoading ? <Loader className="transition animate-spin" /> : "Войти"}
        </Button>
        <div className="w-full flex justify-center items-center gap-3">
          <Link href="/sign-up" className="text-sm">
            Нет аккаунта?
          </Link>
          <SignInOAuthButtons />
        </div>
        <p>{error && "Неверная почта или пароль"}</p>
      </form>
    </div>
  );
}
