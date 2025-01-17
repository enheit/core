/**
 * Merges an `Collection<Effect<R, E, A>>` to a single `Effect<R, E, B>`, working
 * sequentially.
 *
 * @tsplus static ets/Effect/Ops mergeAll
 */
export function mergeAll<R, E, A, B>(
  as: LazyArg<Collection<Effect<R, E, A>>>,
  zero: LazyArg<B>,
  f: (b: B, a: A) => B,
  __tsplusTrace?: string
): Effect<R, E, B> {
  return Effect.suspendSucceed(() =>
    as().reduce(Effect.succeed(zero) as Effect<R, E, B>, (acc, a) => acc.zipWith(a, f))
  )
}
