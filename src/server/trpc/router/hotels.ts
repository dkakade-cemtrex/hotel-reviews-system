import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const hotelRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.hotel.findMany();
  }),
  getHotel: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.hotel.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  review: publicProcedure
    .input(
      z.object({
        rating: z.number().min(0).max(5),
        feedback: z.string(),
        hotelId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const reviewObj = await ctx.prisma.review.create({
        data: {
          feedback: input.feedback,
          rating: input.rating,
          userId: input.userId,
          hotelId: input.hotelId,
        },
      });      
      return {
        submit: `Your review submitted successfully.`,
      };
    }),
  getReviews: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.review.findMany({
        where: {
          hotelId: input.id,
        },
        include: {
          Hotel: true,
        },
        orderBy: {
          Hotel: {
            name: "asc",
          },
        },
      });
    }),
  getAvgReviews: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.groupBy({
      by: ["hotelId"],
      _avg: {
        rating: true,
      },
    });
  }),
});
