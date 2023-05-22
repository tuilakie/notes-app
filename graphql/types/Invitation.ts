import { builder } from "../builder";
import prisma from "@/lib/prisma";

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
    name: t.string({
      nullable: true,
      resolve: async (parent, args, ctx, info) => {
        const user = await prisma.user.findUnique({
          where: {
            email: parent.email,
          },
        });
        return user?.name || null;
      },
    }),
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
      const invitation = await prisma.invitation.findMany({
        ...query,
        where: {
          workspace: {
            ownerId: ctx.user?.id,
          },
        },
      });

      // add name of user with this email to invitation
      const invitations = await Promise.all(
        invitation.map(async (invitation) => {
          const user = await prisma.user.findUnique({
            where: {
              email: invitation.email,
            },
          });
          return {
            ...invitation,
            user: user,
          };
        })
      );
      return invitations;
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
        validate: {
          email: true,
        },
      }),
      workspaceId: t.arg.id({
        required: true,
      }),
    },
    resolve: async (query, parent, args, ctx, info) => {
      // check if exists user with this email
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error("User with this email does not exist");
      }
      // check if user is already invited to this workspace
      const invitation = await prisma.invitation.findFirst({
        where: {
          workspaceId: args.workspaceId.toString(),
          email: args.email,
        },
      });
      if (invitation) {
        throw new Error("User is already invited to this workspace");
      }
      // check if user is already member of this workspace
      const membership = await prisma.workspaceMembership.findFirst({
        where: {
          workspaceId: args.workspaceId.toString(),
          userId: user.id,
        },
      });
      if (membership) {
        throw new Error("User is already member of this workspace");
      }
      // check if user is already owner of this workspace
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: args.workspaceId.toString(),
        },
      });
      if (workspace?.ownerId === user.id) {
        throw new Error("User is already owner of this workspace");
      }

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
      // check if ctx.user.id === invitation.workspace.ownerId or ctx.user.email === invitation.email
      const invitation = await prisma.invitation.findFirst({
        ...query,
        where: {
          OR: [
            {
              workspace: {
                ownerId: ctx.user?.id,
              },
            },
            {
              email: ctx.user?.email,
            },
          ],
        },
      });

      if (!invitation) {
        throw new Error("You are not allowed to delete this invitation");
      }

      return prisma.invitation.delete({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
}));
