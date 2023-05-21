import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ValidationPlugin from "@pothos/plugin-validation";
import prisma from "@/lib/prisma";

import { DateTimeResolver } from "graphql-scalars";
import { PubSub } from "graphql-subscriptions";
import PrismaTypes from "@/prisma/pothos-types";

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
