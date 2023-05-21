import { builder } from "../builder";

builder.prismaObject("Note", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
    content: t.exposeString("content"),
    priority: t.exposeString("priority"),
    folder: t.relation("folder"),
    folderId: t.exposeID("folderId"),
  }),
});

builder.queryFields((t) => ({
  note: t.prismaField({
    type: "Note",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      const note = await prisma.note.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
      const folder = await prisma.folder.findUniqueOrThrow({
        where: {
          id: note.folderId.toString(),
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

      return note;
    },
  }),
  // notes: t.prismaField({
  //   type: ["Note"],
  //   resolve: async (query, parent, args, ctx, info) => {
  //     return prisma.note.findMany({
  //       ...query,
  //       orderBy: {
  //         updatedAt: "desc",
  //       },
  //     });
  //   },
  // }),
}));

builder.mutationFields((t) => ({
  createNote: t.prismaField({
    type: "Note",
    args: {
      content: t.arg.string({
        required: true,
      }),
      folderId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.note.create({
        ...query,
        data: {
          content: args.content,
          folder: {
            connect: {
              id: args.folderId.toString(),
            },
          },
        },
      });
    },
  }),
  updateNote: t.prismaField({
    type: "Note",
    args: {
      id: t.arg.id({
        required: true,
      }),
      content: t.arg.string({
        required: false,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      // check if user is authorized to update note
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              ownedWorkspaces: {
                some: {
                  folders: {
                    some: {
                      notes: {
                        some: {
                          id: args.id.toString(),
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              workspaceMemberships: {
                some: {
                  role: "READ_WRITE",
                  workspace: {
                    folders: {
                      some: {
                        notes: {
                          some: {
                            id: args.id.toString(),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      });
      if (!users.find((user) => user.id === ctx.user?.id)) {
        throw new Error("Not authorized");
      }

      return prisma.note.update({
        ...query,
        where: {
          id: args.id.toString(),
        },
        data: {
          content: args.content || undefined,
        },
      });
    },
  }),
  deleteNote: t.prismaField({
    type: "Note",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              ownedWorkspaces: {
                some: {
                  folders: {
                    some: {
                      notes: {
                        some: {
                          id: args.id.toString(),
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              workspaceMemberships: {
                some: {
                  role: "READ_WRITE",
                  workspace: {
                    folders: {
                      some: {
                        notes: {
                          some: {
                            id: args.id.toString(),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      });
      if (!users.find((user) => user.id === ctx.user?.id)) {
        throw new Error("Not authorized");
      }
      return prisma.note.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
