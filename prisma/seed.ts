// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "1",
      email: "example@gmail.com",
      name: "Example User",
      avatar: "https://example.com/avatar.png",
      workspaces: {
        create: {
          id: "1",
          name: "Example Workspace",
          ownerId: "1",
          folders: {
            create: {
              id: "1",
              name: "Example Folder",
              notes: {
                create: {
                  id: "1",
                  title: "Example Note",
                  content: "Example content",
                },
              },
            },
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
