import * as z from "zod";

const IngredientsSchema = z.object({
  id: z.string(),
  ingredientName: z.string(),
  ingredientAmount: z.string(),
  ingredientMeasurementUnit: z.string(),
});

const InstructionsSchema = z.object({
  id: z.string(),
  instructions: z.string(),
});

const RecipeSchema = z.object({
  title: z.string().min(1).max(30),
  instructions: z.array(InstructionsSchema),
  ingredients: z.array(IngredientsSchema),
});

const recipeSchemaDefaultValues = {
  id: "",
  ingredientName: "",
  ingredientAmount: "",
  ingredients: [{ ingredientName: "", ingredientAmount: "", ingredientMeasurementUnit: "" }],
  ingredientMeasurementUnit: "",
};

export { RecipeSchema, IngredientsSchema, recipeSchemaDefaultValues };
export type RecipeForm = z.infer<typeof RecipeSchema>;
export type IngredientForm = z.infer<typeof IngredientsSchema>;
export type InstructionsForm = z.infer<typeof InstructionsSchema>;
