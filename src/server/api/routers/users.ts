import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  find: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({ where: { id: input.id } });
      return user;
    }),

  getPosts: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const postsByUser = await ctx.db.post.findMany({
        where: { createdById: input.id },
      });
      return postsByUser;
    }),
});

// clour9i0j0000w1zoxvr7ak1g
