// This page is to handle requests for specific recipes
import { recipeSchema } from "@/models/Recipe";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest, { params }: { params: { id: number } }) {
  if (params.id > 10) return NextResponse.json({ error: "Recipe not found" }, { status: 400 });
  return NextResponse.json({ id: 1, title: "Carrot Cake" });
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
  const body = await request.json();
  const validation = recipeSchema.safeParse(body)
  if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
  if (params.id > 10) return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  return NextResponse.json({ id: 1, title: body.title });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {

}