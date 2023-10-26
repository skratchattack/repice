import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  ingredientLine: z.array(
    z.object({
      ingredientName: z.string().max(30),
      ingredientAmount: z.number().min(0),
      ingredientMeasurementUnit: z.string(),
    })
  ),
  instructions: z.string()
});
