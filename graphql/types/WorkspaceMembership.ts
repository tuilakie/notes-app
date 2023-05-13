import { builder } from "../builder";

builder.prismaObject("WorkspaceMembership", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "Date",
    }),
    role: t.exposeString("role"),
    user: t.relation("user"),
    userId: t.exposeID("userId"),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeID("workspaceId"),
  }),
});

builder.queryFields((t) => ({
  workspaceMembership: t.prismaField({
    type: "WorkspaceMembership",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspaceMembership.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
  workspaceMemberships: t.prismaField({
    type: ["WorkspaceMembership"],
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.workspaceMembership.findMany({
        ...query,
      });
    },
  }),
}));
