import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

// READ
export async function GET() {
  const movies = await prisma.movie.findMany();

  return Response.json(movies);
}

// CREATE
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