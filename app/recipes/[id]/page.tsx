
import { Flex, Heading, Table, Text } from "@radix-ui/themes";
import { Prisma, Recipe, Ingredients } from "@prisma/client";
import prisma from "@/prisma/client";
import React, { useState } from "react";
import { notFound } from "next/navigation";
import { JsonValue } from "@prisma/client/runtime/library";
import DndPage from "@/app/components/DndPage";

interface Props {
  params: { id: string };
}



const RecipeDetails = async ({ params }: Props) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
  });
  const ingredients = await prisma.ingredients.findMany({
    where: { ingredientId: parseInt(params.id) }
  })
  console.log(ingredients)


  if (!recipe) notFound();

  return (
    <>
      <Flex gap="3" my="2" direction='column'>
        <h1 className="pb-5">{recipe.title}</h1>
        <div className="w-72">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Ingredient</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            
            {ingredients.map((ingredient, index) => (
              <Table.Row key={index}>
                <Table.Cell>{ingredient.ingredientName}</Table.Cell>
                <Table.Cell>
                  {ingredient.ingredientAmount} {ingredient.ingredientMeasurementUnit}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        </div>
        <DndPage recipes={ingredients}/>
      </Flex>
    </>
  );
};

export default RecipeDetails;
