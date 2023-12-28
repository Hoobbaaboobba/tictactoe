"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SignUpModel() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  // This function will handle the user submitting their email and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        router.push("/");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Once the sign-up form was submitted, verifying was set to true and as a result, this verification form is presented to the user to input their verification code.
  if (verifying) {
    return (
      <form
        onSubmit={handleVerify}
        className="flex w-[400px] border-2 dark:border-white flex-col gap-4 shadow-md rounded-md p-8 justify-center items-center my-8"
      >
        <h1 className="text-center">
          Мы отправили вам на почту код подтверждения
        </h1>
        <Input
          value={code}
          id="code"
          name="code"
          onChange={(e) => setCode(e.target.value)}
          placeholder="Код"
        />
        <Button type="submit" className="w-full">
          Завершить регистрацию
        </Button>
      </form>
    );
  }

  return (
    <div className="py-8">
      <form className="flex w-[400px] border-2 dark:border-white flex-col gap-4 shadow-md rounded-md p-8 justify-center items-center">
        <h1 className="text-2xl text-center font-bold">Зарегистрируйся!</h1>
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
            className="w-full"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Войти
        </Button>
        <Link href="/sign-in" className="text-sm">
          Уже есть аккаунт?
        </Link>
      </form>
    </div>
  );
}
