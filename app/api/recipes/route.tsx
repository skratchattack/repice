import { NextRequest, NextResponse } from "next/server";
import { recipeSchema } from "@/models/Recipe";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = recipeSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

  const newRecipe = await prisma.recipe.create({
    data: { title: body.title, ingredient: body.ingredient, instructions: body.instructions },
  });

  return NextResponse.json(newRecipe, { status: 201 });
}
