import type { Effect } from "../definition"

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @ets fluent ets/Effect zipLeft
 * @ets operator ets/Effect <
 */
export function zipLeft_<R, E, A, R2, E2, A2>(
  self: Effect<R, E, A>,
  that: Effect<R2, E2, A2>,
  __etsTrace?: string
): Effect<R & R2, E | E2, A> {
  return self.flatMap((a) => that.as(a))
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @ets_data_first zipLeft_
 */
export function zipLeft<R2, E2, A2>(that: Effect<R2, E2, A2>) {
  return <R, E, A>(self: Effect<R, E, A>): Effect<R & R2, E | E2, A> =>
    zipLeft_(self, that)
}