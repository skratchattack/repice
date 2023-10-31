// This page is to handle requests for specific recipes
import { RecipeSchema } from "@/models/Recipe";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!recipe) return NextResponse.json({ error: "Recipe not found" }, { status: 400 });
  return NextResponse.json(recipe);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  console.log(body);
  const validation = RecipeSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      ingredients: true,
    },
  });

  if (!recipe) return NextResponse.json({ error: "Recipe not found" }, { status: 404 });

  const updatedIngredients = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ingredient = recipe.ingredients[i];
    const updatedIngredient = await prisma.ingredients.update({
      where: { id: ingredient.id },
      data: {
        ingredientName: body.ingredients[i].ingredientName,
        ingredientAmount: body.ingredients[i].ingredientAmount,
        ingredientMeasurementUnit: body.ingredients[i].ingredientMeasurementUnit,
      },
    });
    updatedIngredients.push(updatedIngredient);
  }

  const updatedRecipe = await prisma.recipe.update({
    where: { id: recipe.id },
    data: {
      title: body.title,
      instructions: body.instructions,
    },
  });

  return NextResponse.json({ recipe: updatedRecipe, ingredients: updatedIngredients });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {}
