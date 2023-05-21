import SchemaBuilder, {
  InputFieldMap,
  InputShapeFromFields,
  MaybePromise,
} from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";
import ValidationPlugin from "@pothos/plugin-validation";
import prisma from "@/lib/prisma";

import { DateResolver, DateTimeResolver } from "graphql-scalars";
import { GraphQLResolveInfo } from "graphql";
import { PubSub, withFilter } from "graphql-subscriptions";
import { ok } from "assert";

const pubsub = new PubSub();

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
  Context: {
    user?: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  };
}>({
  plugins: [PrismaPlugin, ValidationPlugin],
  validationOptions: {
    // optionally customize how errors are formatted
    validationError: (zodError, args, context, info) => {
      // the default behavior is to just throw the zod error directly
      return zodError;
    },
  },
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("DateTime", DateTimeResolver, {});

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => {
        pubsub.publish("ok", {
          ok: true,
        });
        return true;
      },
    }),
  }),
});

builder.subscriptionType({});
builder.subscriptionField("ok", (t) =>
  t.boolean({
    subscribe: () => pubsub.asyncIterator("ok") as any,
    resolve: () => true,
  })
);
