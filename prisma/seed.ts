import { Folder } from "@prisma/client";
// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // drop all data
  await prisma.note.deleteMany();
  await prisma.folder.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: "1",
      email: "example@gmail.com",
      name: "Example User",
      avatar: "https://example.com/avatar.png",
    },
  });

  await prisma.workspace.createMany({
    data: [
      {
        id: "1",
        name: "Example Workspace",
        ownerId: "1",
      },
      {
        id: "2",
        name: "Example Workspace 2",
        ownerId: "1",
      },
      {
        id: "3",
        name: "Example Workspace 3",
        ownerId: "1",
      },
      {
        id: "4",
        name: "Example Workspace 4",
        ownerId: "1",
      },
      {
        id: "5",
        name: "Example Workspace 5",
        ownerId: "1",
      },
    ],
  });

  await prisma.folder.createMany({
    data: [
      {
        id: "1",
        name: "Example Folder",
        workspaceId: "1",
      },
      {
        id: "2",
        name: "Example Folder 2",
        workspaceId: "1",
      },
      {
        id: "3",
        name: "Example Folder 3",
        workspaceId: "1",
      },
      {
        id: "4",
        name: "Example Folder 4",
        workspaceId: "1",
      },
      {
        id: "5",
        name: "Example Folder 5",
        workspaceId: "1",
      },
    ],
  });

  await prisma.note.createMany({
    data: [
      {
        id: "1",
        content: "Example Note Content",
        folderId: "1",
      },
      {
        id: "2",
        content: "Example Note Content 2",
        folderId: "1",
      },
      {
        id: "3",
        content: "Example Note Content 3",
        folderId: "1",
      },
      {
        id: "4",
        content: "Example Note Content 4",
        folderId: "1",
      },
      {
        id: "5",
        content: "Example Note Content 5",
        folderId: "1",
      },
    ],
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
