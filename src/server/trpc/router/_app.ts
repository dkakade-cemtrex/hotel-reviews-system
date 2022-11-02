// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { hotelRouter } from "./hotels";

export const appRouter = router({
  hotel: hotelRouter,
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
