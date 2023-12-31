import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import React from "react";
import DndPage from "../components/DndPage";



const RecipeCollection = async () => {
  const recipes = await prisma.recipe.findMany()
  return <div>
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Recipe Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {recipes.map(recipe => (<Table.Row key={recipe.id}>
          <Table.Cell>{recipe.title}</Table.Cell>
          <Table.Cell>{recipe.createdAt.toDateString()}</Table.Cell>
        </Table.Row>))}
      </Table.Body>
    </Table.Root>
<Button>New Recipe</Button>
  </div>;
};

export default RecipeCollection;
