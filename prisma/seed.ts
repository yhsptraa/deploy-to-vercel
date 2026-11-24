import { prisma } from "../src/lib/prisma";

async function main() {
  const movies = await prisma.movie.createMany({
    data: [
      {
        title: "Interstellar",
        description: "A science fiction movie about space exploration.",
      },
      {
        title: "Inception",
        description: "A science fiction thriller about dreams.",
      },
    ],
  });

  console.log(`${movies.count} movies berhasil ditambahkan`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });