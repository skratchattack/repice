import { Box, Flex, TextField } from "@radix-ui/themes";
import { IngredientForm } from "@/models/Recipe";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type IngredientProps = {
    register: UseFormRegister<IngredientForm>
}

const IngredientLine: FC<IngredientProps> = ({ register }) => {
  return (
    <Flex gap='1'>
      <Box width="100%">
        <TextField.Input type='text' placeholder="Ingredient Name" {...register('ingredientName')}/>
      </Box>
      <Box width="auto">
        <TextField.Input type='number' placeholder="Amount" {...register('ingredientAmount')}/>
      </Box>
      <Box width="9">
        <TextField.Input type='text' placeholder="Units" {...register('ingredientMeasurementUnit')}/>
      </Box>
    </Flex>
  );
};

export default IngredientLine;
