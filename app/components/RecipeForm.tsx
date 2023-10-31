"use client";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeSchema, RecipeForm, recipeSchemaDefaultValues } from "@/models/Recipe";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewRecipeForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeForm>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: recipeSchemaDefaultValues,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<RecipeForm> = async (data, event) => {
    console.log(`RecipeForm Data: ${data}`);
    event?.preventDefault();
    try {
      await axios.post("/api/recipes", data);
      router.push("/recipes");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      append({
        ingredientName: "",
        ingredientAmount: "",
        ingredientMeasurementUnit: "",
      });
    }
  };
  const onInvalid = (errors: any) => console.error(`from onInvalid ${errors}`);

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" {...register("title")} placeholder="Recipe Title" />
            {errors.title && (
              <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">{errors.title?.message}</p>
            )}
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <label>Ingredient Name</label>
                    <input type="text" {...register(`ingredients.${index}.ingredientName`)}></input>
                    <input type="text" {...register(`ingredients.${index}.ingredientAmount`)}></input>
                    <input
                      type="text"
                      {...register(`ingredients.${index}.ingredientMeasurementUnit`)}
                      onKeyDown={handleKeyDown}
                    ></input>
                  </div>
                );
              })}
            </div>
            <label htmlFor="instructions">Instructions:</label>
            <input id="instructions" type="text" {...register("instructions")} placeholder="Instructions" />
            {errors.instructions && (
              <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
                {errors.instructions?.message}
              </p>
            )}

            <button
              type="button"
              className="text-3xl bg-lime-300 p-2 rounded-md max-w-[10rem]"
              onClick={handleSubmit(onSubmit, onInvalid)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewRecipeForm;

// When writing up a recipe, then you should see some autocomplete options in the ingredientName field that represents your ingredientList, so you can link then up to your recipes. Choosing them is optional, if you don't choose any then it will be treaded as a neutral string, otherwise it should be synced to that ingredient that was chosen. That way you can get more features to your recipe like price and nutritional value.
