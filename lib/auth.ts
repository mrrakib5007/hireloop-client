import { betterAuth, APIError } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop_db");

export const VALID_ROLES = ["candidate", "recruiter", "admin"] as const;
export type UserRole = (typeof VALID_ROLES)[number];

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "candidate",
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = (user as Record<string, unknown>).role as string;
          if (role && !VALID_ROLES.includes(role as UserRole)) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid role. Allowed roles are: candidate, recruiter, admin.",
            });
          }
          if (!role) {
            return {
              data: {
                ...user,
                role: "candidate",
              },
            };
          }
        },
      },
      update: {
        before: async (user) => {
          const role = (user as Record<string, unknown>).role as string | undefined;
          if (role && !VALID_ROLES.includes(role as UserRole)) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid role. Allowed roles are: candidate, recruiter, admin.",
            });
          }
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
