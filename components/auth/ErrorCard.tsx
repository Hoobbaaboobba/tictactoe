import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="w-full text-zinc-700 text-center text-2xl font-semibold">
        Упс! Что-то пошло не так!
      </CardHeader>
      <CardFooter>
        <BackButton label="Вернуться к авторизации" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
