import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Model is required" }),
  egi: z.string().min(1, { message: "EGI is required" }),
});

export type UnitSchema = z.infer<typeof unitSchema>;

export const locationSchema = z.object({
  long: z.string().min(1, { message: "Longitude is required" }),
  lat: z.string().min(1, { message: "Latitude is required" }),
  alt: z.string().min(1, { message: "Altitude is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  dateTime: z.string().min(1, { message: "Date and Time is required" }),
  createdBy: z
    .string()
    .min(1, { message: "Please login again, user not detected" }),
});

export type LocationSchema = z.infer<typeof locationSchema>;
