"use client";
import { RecipeForm, RecipeSchema, recipeSchemaDefaultValues } from "@/models/Recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import IngredientDisplay from "./_components/IngredientDisplay";
import IngredientComponent from "./_components/Ingredients";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";

export default function NewRecipePage() {

    const { register, handleSubmit, control, getValues, setFocus } = useForm<RecipeForm>({
        resolver: zodResolver(RecipeSchema),
        defaultValues: recipeSchemaDefaultValues,
      });
      
  return (
    
    <div className={styles.pageContainer}>
      <form action="">
        <IngredientDisplay />
      </form>
    </div>
  );
}
