
import { router } from '../trpc';
import { authRouter } from './auth';
import { grovesRouter } from './groves';
import { audioRouter } from './audio';

export const appRouter = router({
  auth: authRouter,
  groves: grovesRouter,
  audio: audioRouter,
});

export type AppRouter = typeof appRouter;
