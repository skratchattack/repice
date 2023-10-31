import { Flex, Heading, Table, Text } from "@radix-ui/themes";
import { Prisma, Recipe } from "@prisma/client";
import prisma from "@/prisma/client";
import React from "react";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const RecipeDetails = async ({ params }: Props) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
  });
  const ingredientObject = recipe?.ingredients as Prisma.JsonArray;
  console.log(ingredientObject);

  if (!recipe) notFound();

  return (
    <>
      <Flex gap="3" my="2">
        <h1>{recipe.title}</h1>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Ingredient</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          {/* <Table.Body>
            {ingredientObject.map((ingredient, index) => (
              <Table.Row key={index}>
                <Table.Cell>{ingredient.ingredientName}</Table.Cell>
                <Table.Cell>
                  {ingredient.ingredientAmount} {ingredient.ingredientMeasurementUnit}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body> */}
        </Table.Root>
      </Flex>
    </>
  );
};

export default RecipeDetails;
