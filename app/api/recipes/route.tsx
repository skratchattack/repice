import { NextRequest, NextResponse } from "next/server";
import { RecipeSchema } from "@/models/Recipe";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const validation = RecipeSchema.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const newRecipe = await prisma.recipe.create({
    data: { title: body.title, ingredients: { create: body.ingredients }, instructions: body.instructions },
  });

  return NextResponse.json(newRecipe, { status: 201 });
}
