import { Box, TextField } from "@radix-ui/themes";
import React from "react";

const IngredientTitle = () => {
  return (
    
    <Box>
      <TextField.Root>
        <TextField.Input placeholder="Title" className="text-center" size="3"></TextField.Input>
      </TextField.Root>
    </Box>
  );
};

export default IngredientTitle;
