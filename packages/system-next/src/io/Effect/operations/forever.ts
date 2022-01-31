import type { Effect } from "../definition"
import { chain_ } from "./chain"
import { yieldNow } from "./yieldNow"

/**
 * Repeats this effect forever (until the first error).
 *
 * @ets fluent ets/Effect forever
 */
export function forever<R, E, A>(
  effect: Effect<R, E, A>,
  __etsTrace?: string
): Effect<R, E, never> {
  return chain_(effect, () => chain_(yieldNow, () => forever(effect)))
}