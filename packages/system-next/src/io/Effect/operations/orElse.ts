import type { LazyArg } from "../../../data/Function"
import { Effect } from "../definition"

/**
 * Executes this effect and returns its value, if it succeeds, but otherwise
 * executes the specified effect.
 *
 * @ets operator ets/Effect |
 * @ets fluent ets/Effect orElse
 */
export function orElse_<R, E, A, R2, E2, A2>(
  self: Effect<R, E, A>,
  that: LazyArg<Effect<R2, E2, A2>>,
  __etsTrace?: string
): Effect<R & R2, E2, A | A2> {
  return self.tryOrElse(that, (a) => Effect.succeedNow(a))
}

/**
 * @ets_data_first orElse_
 */
export function orElse<R2, E2, A2>(
  that: LazyArg<Effect<R2, E2, A2>>,
  __etsTrace?: string
) {
  return <R, E, A>(self: Effect<R, E, A>): Effect<R & R2, E2, A | A2> =>
    orElse_(self, that)
}