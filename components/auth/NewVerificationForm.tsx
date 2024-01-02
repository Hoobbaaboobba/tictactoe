"use client";

import { ScaleLoader } from "react-spinners";

import { CardWrapper } from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams?.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }
    if (!token) {
      if (!token) {
        setError("Нет токена!");
        return;
      }
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Что-то пошло не так!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Подверждение аккаунта"
      backButtonLabel="Вернуться к верификации"
      backButtonHref="/auth/login"
    >
      {!success && !error && (
        <>
          <div className="dark:flex hidden items-center w-full justify-center">
            <ScaleLoader color="#ffffff" />
          </div>{" "}
          <div className="dark:hidden flex items-center w-full justify-center">
            <ScaleLoader color="#000000" />
          </div>{" "}
        </>
      )}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </CardWrapper>
  );
};
