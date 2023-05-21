import { builder } from "../builder";

builder.prismaObject("Folder", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
    name: t.exposeString("name"),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeID("workspaceId"),
    notes: t.relation("notes"),
  }),
});

builder.queryFields((t) => ({
  folder: t.prismaField({
    type: "Folder",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      const folder = await prisma.folder.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
      const authorized = await prisma.user.findFirst({
        where: {
          OR: [
            {
              ownedWorkspaces: {
                some: {
                  id: folder.workspaceId,
                  ownerId: ctx.user?.id,
                },
              },
            },
            {
              workspaceMemberships: {
                some: {
                  workspaceId: folder.workspaceId,
                  userId: ctx.user?.id,
                },
              },
            },
          ],
        },
      });
      if (!authorized) {
        throw new Error("Not authorized");
      }
      return folder;
    },
  }),
}));

builder.mutationFields((t) => ({
  createFolder: t.prismaField({
    type: "Folder",
    args: {
      name: t.arg.string({
        required: true,
      }),
      workspaceId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.folder.create({
        ...query,
        data: {
          name: args.name,
          workspaceId: args.workspaceId.toString(),
        },
      });
    },
  }),
  updateFolder: t.prismaField({
    type: "Folder",
    args: {
      id: t.arg.id({
        required: true,
      }),
      name: t.arg.string({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.folder.update({
        ...query,
        where: {
          id: args.id.toString(),
        },
        data: {
          name: args.name,
        },
      });
    },
  }),
  deleteFolder: t.prismaField({
    type: "Folder",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.folder.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
