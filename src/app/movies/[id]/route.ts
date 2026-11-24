import { prisma } from "@/src/lib/prisma";

export const runtime = "nodejs";

// UPDATE
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movieId = Number(id);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    return Response.json(
      { error: "Invalid movie ID" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const movie = await prisma.movie.update({
    where: { id: movieId },
    data: {
      title: body.title,
      description: body.description,
      duration: body.duration,
    },
  });

  return Response.json(movie);
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movieId = Number(id);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    return Response.json(
      { error: "Invalid movie ID" },
      { status: 400 }
    );
  }

  await prisma.movie.delete({
    where: { id: movieId },
  });

  return Response.json({
    message: "Movie deleted successfully",
  });
}