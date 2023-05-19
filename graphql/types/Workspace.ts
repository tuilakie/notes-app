import { Workspace } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject("Workspace", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
    name: t.exposeString("name"),
    owner: t.relation("owner"),
    ownerId: t.exposeID("ownerId"),
    memberships: t.relation("memberships"),
    folders: t.relation("folders"),
    Invitation: t.relation("Invitation"),
  }),
});

builder.queryFields((t) => ({
  workspace: t.prismaField({
    type: "Workspace",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspace.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createWorkspace: t.prismaField({
    type: "Workspace",
    args: {
      name: t.arg.string({
        required: true,
        validate: {
          minLength: 3,
        },
      }),
      ownerId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspace.create({
        ...query,
        data: {
          name: args.name,
          ownerId: args.ownerId.toString(),
        },
      });
    },
  }),

  updateWorkspace: t.prismaField({
    type: "Workspace",
    args: {
      id: t.arg.id({
        required: true,
      }),
      name: t.arg.string({
        required: false,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspace.update({
        ...query,
        where: {
          id: args.id.toString(),
        },
        data: {
          name: args.name || undefined,
        },
      });
    },
  }),

  deleteWorkspace: t.prismaField({
    type: "Workspace",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspace.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
