/**
 * Accesses the environment of the effect.
 *
 * @tsplus static ets/Effect/Ops environmentWith
 */
export function environmentWith<R, A>(
  f: (env: Env<R>) => A,
  __tsplusTrace?: string
): Effect.RIO<R, A> {
  return Effect.environment<R>().map(f)
}
