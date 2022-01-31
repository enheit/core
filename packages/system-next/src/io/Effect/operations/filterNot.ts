import { Effect } from "../definition"

/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @ets static ets/EffectOps filterNot
 */
export function filterNot_<A, R, E>(
  as: Iterable<A>,
  f: (a: A) => Effect<R, E, boolean>,
  __etsTrace?: string
) {
  return Effect.filter(as, (x) => f(x).map((b) => !b))
}

/**
 * Filters the collection using the specified effectual predicate, removing
 * all elements that satisfy the predicate.
 *
 * @ets_data_first filterNot_
 */
export function filterNot<A, R, E>(
  f: (a: A) => Effect<R, E, boolean>,
  __etsTrace?: string
) {
  return (as: Iterable<A>) => filterNot_(as, f)
}