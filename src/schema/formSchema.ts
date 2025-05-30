import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const formSchema = z.object({
  username: z.string().min(3).max(20),
  firstname: z.string().min(3).max(20),
  lastname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  }),
  confirmPassword: z.string().min(8).regex(passwordRegex, {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
