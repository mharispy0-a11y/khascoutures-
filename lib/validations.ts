import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .regex(
      /^[+]?[0-9\s\-]{8,20}$/,
      "Enter a valid phone number (e.g. +92 300 1234567)"
    ),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  occasion: z.enum(["bridal", "party", "pret", "custom"]),
  message: z.string().max(1000, "Message is too long (max 1000 characters)").optional(),
  token: z.string().min(1, "Bot verification required"),
  honey: z.literal("").optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.enum(["bridal", "party", "pret"]),
  fabric: z.string().max(100).optional().nullable(),
  embroidery: z.string().max(100).optional().nullable(),
  price_pkr: z.number().int().positive().optional().nullable(),
  price_on_request: z.boolean().default(false),
  image_url: z.string().url().optional().nullable(),
  image_alt: z.string().max(200).optional().nullable(),
  whatsapp_enquiry_text: z.string().max(300).optional().nullable(),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});
