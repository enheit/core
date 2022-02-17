import { Effect } from "../../../Effect"
import type { Atomic } from "../Atomic"

export function update_<A>(
  self: Atomic<A>,
  f: (a: A) => A,
  __etsTrace?: string
): Effect<unknown, never, void> {
  return Effect.succeed(() => {
    self.value.set(f(self.value.get))
  })
}

/**
 * @ets_data_first update_
 */
export function update<A>(f: (a: A) => A, __etsTrace?: string) {
  return (self: Atomic<A>): Effect<unknown, never, void> => update_(self, f)
}