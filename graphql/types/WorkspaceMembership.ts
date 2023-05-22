import { builder } from "../builder";
import prisma from "@/lib/prisma";

builder.prismaObject("WorkspaceMembership", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
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

builder.mutationFields((t) => ({
  acceptInvitation: t.prismaField({
    type: "WorkspaceMembership",
    args: {
      workspaceId: t.arg.id({
        required: true,
      }),
      email: t.arg.string({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      const invitation = await prisma.invitation.findFirst({
        where: {
          email: args.email,
          workspaceId: args.workspaceId.toString(),
        },
      });
      console.log(args.email, args.workspaceId.toString());

      if (!invitation) {
        throw new Error("Invitation not found");
      }
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }

      const workspaceMembership = await prisma.workspaceMembership.create({
        data: {
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
          workspace: {
            connect: {
              id: invitation.workspaceId,
            },
          },
        },
      });
      await prisma.invitation.delete({
        where: {
          id: invitation.id,
        },
      });

      return workspaceMembership;
    },
  }),
  leaveMembership: t.prismaField({
    type: "WorkspaceMembership",
    args: {
      userId: t.arg.id({
        required: true,
      }),
      workspaceId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      if (args.userId.toString() !== ctx.user?.id) {
        throw new Error("You are not authorized to leave this workspace");
      }

      const workspaceMembership = await prisma.workspaceMembership.findFirst({
        where: {
          userId: args.userId.toString(),
          workspaceId: args.workspaceId.toString(),
        },
      });
      if (!workspaceMembership) {
        throw new Error("Workspace membership not found");
      }
      await prisma.workspaceMembership.delete({
        where: {
          id: workspaceMembership.id,
        },
      });
      return workspaceMembership;
    },
  }),
}));
