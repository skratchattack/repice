"use client";
import * as z from "zod";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";

interface ConceptForm {
  ingredientName: string;
  ingredientAmount: number;
  ingredientMeasurementUnit: string;
}

const test = z.object({
  ingredientName: z.string(),
  ingredientAmount: z.number(),
  ingredientMeasurementUnit: z.string().min(1),
});

type testForm = z.infer<typeof test>;

const FormConcept01 = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<testForm>();

  const [ingredientList, setIngredientList] = useState<ConceptForm[]>([]);

  const onSubmit: SubmitHandler<testForm> = async (data) => {
    try {
      await axios.post("/api/recipes", data);
      router.push("/recipes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    const newData = {
      ingredientName: getValues("ingredientName"),
      ingredientAmount: getValues("ingredientAmount"),
      ingredientMeasurementUnit: getValues("ingredientMeasurementUnit"),
    };



    if (e.key === "Enter") {
      
      setIngredientList((prevIngredients) => {
        return [...prevIngredients, newData];
      });
      console.log(touchedFields);
      setFocus("ingredientName");
      reset();
    }
  };

  // const conceptSubmitHandler = (data: any) => {
  //   const newData = {
  //     ingredientName: getValues("ingredientName"),
  //     ingredientAmount: getValues("ingredientAmount"),
  //     ingredientMeasurementUnit: getValues("ingredientMeasurementUnit"),
  //   };

  //   setIngredientList((prevIngredients) => {
  //     return [...prevIngredients, newData];
  //   });
  //   console.log(newData);
  //   setFocus("ingredientName");
  //   reset();
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <TextField.Root>
        <TextField.Input placeholder="Ingredient Name" {...register("ingredientName")} />
        <TextField.Input type="number" placeholder="Amount" {...register("ingredientAmount")} />
        <TextField.Input
          placeholder="Measurement Unit"
          {...register("ingredientMeasurementUnit")}
          onKeyDown={handleKeyDown}
        />
      </TextField.Root>
      <Button type="button">Submit</Button>
      {ingredientList.map((item, index) => (
        <p key={index}>
          {item.ingredientName} - {item.ingredientAmount} {item.ingredientMeasurementUnit}
        </p>
      ))}
    </form>
  );
};

export default FormConcept01;
