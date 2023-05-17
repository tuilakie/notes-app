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
      return prisma.note.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
  notes: t.prismaField({
    type: ["Note"],
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.note.findMany({
        ...query,
        orderBy: {
          updatedAt: "desc",
        },
      });
    },
  }),
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
      return prisma.note.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
