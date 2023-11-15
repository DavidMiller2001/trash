import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany();
    const users = await ctx.db.user.findMany();

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.createdById),
    }));
  }),

  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.create({
        data: {
          content: input.content,
          createdById: ctx.session.user.id,
        },
      });
    }),
});

// clour9i0j0000w1zoxvr7ak1g
