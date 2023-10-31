"use client";
import IngredientLine from "@/app/components/recipeFormComponents/IngredientLine";
import IngredientTitle from "@/app/components/recipeFormComponents/IngredientTitle";
import { Box, Button, Container, Flex, TextField } from "@radix-ui/themes";
import React from "react";

const RecipeFormPage = () => {
  return (
    <Container size='2'>
        <Flex className="mb-5" direction='column'>
          <IngredientTitle />
        </Flex>
        <Flex direction='column' gap='1'>
          <IngredientLine />
          <IngredientLine />
        </Flex>
        <Button size="4" className="">
          Submit New Recipe
        </Button>
    </Container>
  );
};

export default RecipeFormPage;
