import * as z from "zod";

export const recipeSchema = z.object({
  title: z.string().trim().min(2, { message: "Title must be 2 or more characters" }),
  ingredient: z.string().min(2, { message: "Ingredient name must have 2 or more characters" }),
  instructions: z.string().min(2, { message: "Instructions must be 2 or more characters" }),
});

export type RecipeForm = z.infer<typeof recipeSchema>;
