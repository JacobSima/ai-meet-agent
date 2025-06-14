import z from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  //TODO: change 'getMany to use protectedProcedure later'
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select()
      .from(agents);

    // await new Promise(resolve => setTimeout(resolve, 5000));
    // throw new TRPCError({code: "BAD_REQUEST"});

    return data;
  }),
  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const existingAgent = await db
      .select()
      .from(agents)
      .where(eq(agents.id, input.id));

    return existingAgent[0];
  }),
  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();
      return createdAgent;
    }),
});