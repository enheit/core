/**
 * The moral equivalent of `if (p) exp`.
 *
 * @tsplus static ets/Effect/Ops when
 */
export function when<R, E, A>(
  predicate: LazyArg<boolean>,
  effect: Effect<R, E, A>,
  __tsplusTrace?: string
): Effect<R, E, Option<A>> {
  return Effect.suspendSucceed(
    predicate() ? effect.map(Option.some) : Effect.succeedNow(Option.none)
  )
}
