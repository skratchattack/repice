import * as z from "zod";

export const recipeSchema = z.object({
  title: z.string().default(""),
  ingredientLine: z.array(
    z.object({
      ingredientName: z.string().max(30).default(""),
      ingredientAmount: z.string().min(0).default(""),
      ingredientMeasurementUnit: z.string().default(""),
    })
  ),
  instructions: z.string().default("")
});

export const recipeSchemaDefaultValues = {
  title: "",
  ingredientLine: [
    {
      ingredientName: "",
      ingredientAmount: "",
      ingredientMeasurementUnit: "",
    }]
  ,
  instructions: ""
};

export type RecipeForm = z.infer<typeof recipeSchema>;
