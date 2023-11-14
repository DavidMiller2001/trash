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
});
