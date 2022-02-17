import type { Option } from "../../../../data/Option"
import { Effect } from "../../../Effect"
import type { Atomic } from "../Atomic"

export function updateSome_<A>(
  self: Atomic<A>,
  f: (a: A) => Option<A>,
  __etsTrace?: string
): Effect<unknown, never, void> {
  return Effect.succeed(() => {
    const o = f(self.value.get)
    if (o._tag === "Some") {
      self.value.set(o.value)
    }
  })
}

/**
 * @ets_data_first updateSome_
 */
export function updateSome<A>(f: (a: A) => Option<A>, __etsTrace?: string) {
  return (self: Atomic<A>): Effect<unknown, never, void> => updateSome_(self, f)
}