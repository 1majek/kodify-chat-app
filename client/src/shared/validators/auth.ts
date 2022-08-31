import { z } from "zod";

export const LoginInput = z
  .object({
    email: z.string().email().max(255),
    password: z.string().min(1).max(24),
  })
  .strict();

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LoginInput = z.infer<typeof LoginInput>;
