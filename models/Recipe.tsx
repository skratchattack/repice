import * as z from "zod";

const IngredientsSchema = z.object({
  ingredientName: z.string(),
  ingredientAmount: z.string(),
  ingredientMeasurementUnit: z.string(),
});

const RecipeSchema = z.object({
  title: z.string().min(1).max(30),
  instructions: z.string(),
  ingredients: z.array(IngredientsSchema),
});

const recipeSchemaDefaultValues = {
  ingredientName: "",
  ingredientAmount: "",
  ingredients: [{ ingredientName: "", ingredientAmount: "", ingredientMeasurementUnit: "" }],
  ingredientMeasurementUnit: "",
};

export { RecipeSchema, IngredientsSchema, recipeSchemaDefaultValues };
export type RecipeForm = z.infer<typeof RecipeSchema>;
export type IngredientForm = z.infer<typeof IngredientsSchema>;
