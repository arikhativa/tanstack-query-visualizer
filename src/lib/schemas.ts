import { typeEnum } from "@/lib/enums";
import { z } from "zod";

const unionSchema = z.union([
  z.string(),
  z.number(),
  z.object(),
  z.null(),
  z.undefined(),
]);

const pairSchema = z.object({
  type: z.enum(typeEnum),
  value: unionSchema,
});

export const queryItemFormSchema = z.object({
  id: z.uuid(),
  label: z.string().min(3),
  queryKey: z.array(pairSchema).min(1),
});

export const queryItemSchema = z.object({
  id: z.uuid(),
  label: z.string(),
  queryKey: z.array(unionSchema).min(1),
});
