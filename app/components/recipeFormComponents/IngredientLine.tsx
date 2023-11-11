import React, { useRef } from "react";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { TiDelete } from "react-icons/ti";
import { Control, FieldValues, UseFormProps, UseFormRegister, useFieldArray, useForm, useWatch } from "react-hook-form";
import { RecipeForm, IngredientForm } from "@/models/Recipe";

interface IngredientLineProps {
  register: UseFormRegister<RecipeForm>;
  control: Control<RecipeForm>;
}

const IngredientLine: React.FC<IngredientLineProps> = ({ register, control }) => {



  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });


  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      append({
        ingredientName: "",
        ingredientAmount: "",
        ingredientMeasurementUnit: "",
      }); 
    }
  };

  

  return (
    <>
      {fields.map((field, index) => (
        <Flex gap="1" key={field.id}>
          <Box width="100%">
            <TextField.Input
              type="text"
              placeholder="Ingredient Name"
              {...register(`ingredients.${index}.ingredientName`)}
            />
          </Box>
          <Box width="auto">
            <TextField.Input type="number" placeholder="Amount" {...register(`ingredients.${index}.ingredientAmount`)} />
          </Box>
          <Box width="9">
            <TextField.Input
              type="text"
              placeholder="Units"
              {...register(`ingredients.${index}.ingredientMeasurementUnit`)}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <div className="absolute -right-8">
            <button
              disabled={fields.length < 2}
              type="button"
              onClick={() => remove(index)}
              className={`text-red-300 align-middle ${fields.length > 1 ? "hover:text-red-500" : ""}`}
            >
              <TiDelete size={20} />
            </button>
          </div>
        </Flex>
      ))}
    </>
  );
};

export default IngredientLine;
