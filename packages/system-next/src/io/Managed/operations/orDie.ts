import { identity } from "../../../data/Function"
import type { Managed } from "../definition"

/**
 * Translates effect failure into death of the fiber, making all failures
 * unchecked and not a part of the type of the effect.
 *
 * @ets fluent ets/Managed orDie
 */
export function orDie<R, E, A>(
  self: Managed<R, E, A>,
  __etsTrace?: string
): Managed<R, never, A> {
  return self.orDieWith(identity)
}