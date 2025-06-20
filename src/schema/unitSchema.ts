import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Model is required" }),
  egi: z.string().min(1, { message: "EGI is required" }),
});

export type UnitSchema = z.infer<typeof unitSchema>;
