import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";

export const auth = betterAuth({
  //Enable normal email and password auth
  emailAndPassword: {
    enabled: true
  },
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  //   },
  // },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
});