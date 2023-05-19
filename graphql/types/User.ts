import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
    email: t.exposeString("email"),
    name: t.exposeString("name", { nullable: true }),
    avatar: t.exposeString("avatar", { nullable: true }),
    workspaceMemberships: t.relation("workspaceMemberships"),
    ownedWorkspaces: t.relation("ownedWorkspaces"),
  }),
});

builder.queryFields((t) => ({
  user: t.prismaField({
    type: "User",
    args: {
      id: t.arg.id({
        required: true,
      }),
    },
    nullable: true,
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: {
          id: args.id.toString(),
        },
      });
    },
  }),
  users: t.prismaField({
    type: ["User"],
    resolve: async (query, parent, args, ctx, info) => {
      return prisma.user.findMany({
        ...query,
      });
    },
  }),
}));

// builder.mutationFields((t) => ({
//   createUser: t.prismaField({
//     type: "User",
//     args: {
//       email: t.arg.string({
//         required: true,
//       }),
//       name: t.arg.string({
//         required: false,
//       }),
//       avatar: t.arg.string({
//         required: false,
//       }),
//     },
//     resolve: async (query, parent, args, ctx, info) => {
//       return prisma.user.create({
//         ...query,
//         data: {
//           email: args.email,
//           name: args.name,
//           avatar: args.avatar,
//         },
//       });
//     },
//   }),
//   updateUser: t.prismaField({
//     type: "User",
//     args: {
//       id: t.arg.id({
//         required: true,
//       }),
//       email: t.arg.string({
//         required: false,
//       }),
//       name: t.arg.string({
//         required: false,
//       }),
//       avatar: t.arg.string({
//         required: false,
//       }),
//     },
//     resolve: async (query, parent, args, ctx, info) => {
//       return prisma.user.update({
//         ...query,
//         where: {
//           id: args.id.toString(),
//         },
//         data: {
//           email: args.email?.toString(),
//           name: args.name?.toString(),
//           avatar: args.avatar?.toString(),
//         },
//       });
//     },
//   }),
//   deleteUser: t.prismaField({
//     type: "User",
//     args: {
//       id: t.arg.id({
//         required: true,
//       }),
//     },
//     resolve: async (query, parent, args, ctx, info) => {
//       return prisma.user.delete({
//         ...query,
//         where: {
//           id: args.id.toString(),
//         },
//       });
//     },
//   }),
// }));
