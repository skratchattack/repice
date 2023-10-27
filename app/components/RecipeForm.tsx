"use client";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeForm, recipeSchema, recipeSchemaDefaultValues } from "@/models/Recipe";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewRecipeForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipeForm>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeSchemaDefaultValues,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredientLine",
  });

  const onSubmit: SubmitHandler<RecipeForm> = async (data) => {
    console.log(data)
    try {
      await axios.post("/api/recipes", data);
      router.push("/recipes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      // append({ ingredientName: "", ingredientAmount: 0, ingredientMeasurementUnit: "" })
      append(
        { ingredientName: "", ingredientAmount: "", ingredientMeasurementUnit: "" },
      );
    }
  };

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
                      <label >Ingredient Name</label>
                    <input type="text" {...register(`ingredientLine.${index}.ingredientName`)}></input>
                    <input type="text" {...register(`ingredientLine.${index}.ingredientAmount`)}></input>
                    <input
                      type="text"
                      {...register(`ingredientLine.${index}.ingredientMeasurementUnit`)}
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

            <button type="submit" className="text-3xl bg-lime-300 p-2 rounded-md max-w-[10rem]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewRecipeForm;
