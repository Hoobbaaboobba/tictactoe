"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schemas";
import * as z from "zod";

export const profile = async (values: z.infer<typeof ProfileSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Неавторизирован" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Неавторизирован" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Профиль обновлен!" };
};
