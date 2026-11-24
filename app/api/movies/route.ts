import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();

    return NextResponse.json({
      success: true,
      data: movies,
    });
  } catch (error) {
    console.error("GET MOVIES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve movies",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  if (
    typeof body.title !== "string" ||
    !body.title.trim() ||
    typeof body.description !== "string" ||
    typeof body.duration !== "number" ||
    !Number.isInteger(body.duration) ||
    body.duration <= 0
  ) {
    return Response.json(
      { error: "Invalid movie data" },
      { status: 400 }
    );
  }

  const movie = await prisma.movie.create({
    data: {
      title: body.title.trim(),
      description: body.description,
      duration: body.duration,
    },
  });

  return Response.json(movie, { status: 201 });
}