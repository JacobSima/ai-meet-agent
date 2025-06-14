import z from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentInsertSchema } from "../schemas";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MEETING_COUNT, MIN_PAGE_SIZE } from "../../../../constant";
// import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(z.object({
      page: z.number().default(DEFAULT_PAGE),
      pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
      search: z.string().nullish()
    }))
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;

      const data = await db
        .select({
          meetingCount: sql<number>`${MEETING_COUNT}`,
          ...getTableColumns(agents)
        })
        .from(agents)
        .where(and(eq(agents.userId, ctx.auth.user.id), search ? ilike(agents.name, `%${search}%`) : undefined))
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db.select({ count: count() })
        .from(agents)
        .where(and(eq(agents.userId, ctx.auth.user.id), search ? ilike(agents.name, `%${search}%`) : undefined));

      const counts = total.count;
      const totalPages = Math.ceil(counts / pageSize);

      return {
        items: data,
        total: counts,
        totalPages
      };

      // await new Promise(resolve => setTimeout(resolve, 5000));
      // throw new TRPCError({code: "BAD_REQUEST"});
    }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const existingAgent = await db
      .select({
        meetingCount: sql<number>`${MEETING_COUNT}`,
        ...getTableColumns(agents)
      })
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