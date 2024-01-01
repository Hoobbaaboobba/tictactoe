import * as z from "zod";

export const ProfileSchema = z.object({
  isTwoFactorEnabled: z.optional(z.boolean()),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Минимальная длина пароля 6 символов",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Необходимо ввести почту",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Необходимо ввести почту",
  }),
  password: z.string().min(1, {
    message: "Необходимо ввести пароль",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Необходимо ввести почту",
  }),
  password: z.string().min(6, {
    message: "Минимальная длина пароля 6 символов",
  }),
  name: z.string().min(1, {
    message: "Необходимо ввести имя",
  }),
});
