import { Box, Flex, TextField } from "@radix-ui/themes";
import React from "react";

const IngredientLine = () => {
  return (
    <Flex gap='1'>
      <Box width="100%">
        <TextField.Input placeholder="Ingredient Name" />
      </Box>
      <Box width="auto">
        <TextField.Input placeholder="Amount"/>
      </Box>
      <Box width="9">
        <TextField.Input placeholder="Units"/>
      </Box>
    </Flex>
  );
};

export default IngredientLine;
