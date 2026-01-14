import { z } from "zod";

export const queryItemSchema = z.object({
  id: z.uuid(),
  label: z.string(),
  queryKey: z.array(
    z.union([z.string(), z.number(), z.object(), z.null(), z.undefined()])
  ),
});
