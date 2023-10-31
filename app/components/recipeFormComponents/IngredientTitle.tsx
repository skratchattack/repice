import { RecipeForm } from "@/models/Recipe";
import { Box, TextField } from "@radix-ui/themes";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type TitleProps = {
  register: UseFormRegister<RecipeForm>;
};

const RecipeTitle: FC<TitleProps> = ({ register }) => {
  return (
    <Box>
      <TextField.Root>
        <TextField.Input placeholder="Title" className="text-center" size="3" {...register("title")}></TextField.Input>
      </TextField.Root>
    </Box>
  );
};

export default RecipeTitle;
