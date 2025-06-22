
import { initTRPC, TRPCError } from '@trpc/server';
import { createAuthContext, type AuthContext } from './lib/auth';

export const createTRPCContext = async (opts: { req?: any }): Promise<AuthContext> => {
  const authorization = opts.req?.headers?.authorization;
  return await createAuthContext(authorization);
};

const t = initTRPC.context<AuthContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
