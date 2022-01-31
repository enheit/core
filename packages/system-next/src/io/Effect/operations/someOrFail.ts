import type { LazyArg } from "../../../data/Function"
import * as O from "../../../data/Option"
import { Effect } from "../definition"

/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets fluent ets/Effect someOrFail
 */
export function someOrFail_<R, E, A, E2>(
  self: Effect<R, E, O.Option<A>>,
  orFail: LazyArg<E2>,
  __etsTrace?: string
): Effect<R, E | E2, A> {
  return self.flatMap(
    O.fold(() => Effect.succeed(orFail).flatMap(Effect.failNow), Effect.succeedNow)
  )
}

/**
 * Extracts the optional value, or fails with the given error 'e'.
 *
 * @ets_data_first someOrFail_
 */
export function someOrFail<E2>(orFail: LazyArg<E2>, __etsTrace?: string) {
  return <R, E, A>(self: Effect<R, E, O.Option<A>>) => someOrFail_(self, orFail)
}