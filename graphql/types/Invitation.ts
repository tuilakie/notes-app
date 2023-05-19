import { builder } from "../builder";

builder.prismaObject("Invitation", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
    email: t.exposeString("email"),
    workspace: t.relation("workspace"),
    workspaceId: t.exposeID("workspaceId"),
  }),
});

builder.queryFields((t) => ({
  invitation: t.prismaField({
    type: "Invitation",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.invitation.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
  sentInvitations: t.prismaField({
    type: ["Invitation"],
    // args: {
    //   userId: t.arg.id({
    //     required: true,
    //   }),
    // },
    resolve: async (query, parent, args, ctx, info) => {
      // console.log(ctx.user?.id);
      return prisma.invitation.findMany({
        ...query,
        where: {
          workspace: {
            ownerId: ctx.user?.id,
          },
        },
      });
    },
  }),
  recivedInvitations: t.prismaField({
    type: ["Invitation"],
    // args: {
    //   email: t.arg.string({
    //     required: true,
    //   }),
    // },

    resolve: async (query, parent, args, ctx, info) => {
      // console.log(ctx.user?.email);
      return prisma.invitation.findMany({
        ...query,
        where: {
          email: ctx.user?.email,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createInvitation: t.prismaField({
    type: "Invitation",
    args: {
      email: t.arg.string({
        required: true,
      }),
      workspaceId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.invitation.create({
        ...query,
        data: {
          email: args.email,
          workspaceId: args.workspaceId.toString(),
        },
      });
    },
  }),
  updateInvitation: t.prismaField({
    type: "Invitation",
    args: {
      id: t.arg.id({
        required: true,
      }),
      email: t.arg.string({
        required: true,
      }),
      workspaceId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.invitation.update({
        ...query,
        where: {
          id: args.id.toString(),
        },
        data: {
          email: args.email,
          workspaceId: args.workspaceId.toString(),
        },
      });
    },
  }),
  deleteInvitation: t.prismaField({
    type: "Invitation",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.invitation.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
