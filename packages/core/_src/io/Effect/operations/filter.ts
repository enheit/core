/**
 * Filters the collection using the specified effectual predicate.
 *
 * @tsplus static ets/Effect/Ops filter
 */
export function filter<A, R, E>(
  as: LazyArg<Collection<A>>,
  f: (a: A) => Effect<R, E, boolean>,
  __tsplusTrace?: string
): Effect<R, E, Chunk<A>> {
  return Effect.suspendSucceed(() =>
    as().reduce(
      Effect.succeed(Chunk.empty<A>()) as Effect<R, E, Chunk<A>>,
      (io, a) => io.zipWith(Effect.suspendSucceed(f(a)), (acc, b) => (b ? acc.append(a) : acc))
    )
  )
}
