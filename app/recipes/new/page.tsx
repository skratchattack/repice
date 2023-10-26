"use client";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeForm, recipeSchema } from "@/models/Recipe";


const CreateRecipe = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RecipeForm>({
    resolver: zodResolver(recipeSchema),
  });

  const onSubmit: SubmitHandler<RecipeForm> = (data) => {
    console.log(data.title);
    console.log(data);
  };

  return (
    <>
      <button onClick={() => trigger()} className="bg-gray-300 rounded p-2 mb-2 text-xl">
        Display Data Requirements
      </button>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" {...register("title")} placeholder="Recipe Title" />
            {errors.title && (
              <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">{errors.title?.message}</p>
            )}
            <label htmlFor="ingredient">Ingredient Name</label>
            <input id="ingredient" type="text" {...register("ingredient")} placeholder="Ingredient Name" />
            {errors.ingredient && (
              <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">{errors.ingredient?.message}</p>
            )}
            <label htmlFor="instructions">Instructions:</label>
            <input id="instructions" type="text" {...register("instructions")} placeholder="Instructions" />
            {errors.instructions && (
              <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">{errors.instructions?.message}</p>
            )}
            <button type="submit" className="text-3xl bg-lime-300 p-2 rounded-md max-w-[10rem]">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRecipe;
