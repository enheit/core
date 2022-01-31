import { Effect } from "../../../Effect"
import type { XSynchronized } from "../definition"
import { dimapEffect_ } from "./dimapEffect"

/**
 * Transforms both the `set` and `get` values of the `ZRef.Synchronized`
 * with the specified functions.
 */
export function dimap_<RA, RB, EA, EB, A, B, C, D>(
  self: XSynchronized<RA, RB, EA, EB, A, B>,
  f: (c: C) => A,
  g: (b: B) => D
): XSynchronized<RA, RB, EA, EB, C, D> {
  return dimapEffect_(
    self,
    (c) => Effect.succeedNow(f(c)),
    (b) => Effect.succeedNow(g(b))
  )
}

/**
 * Transforms both the `set` and `get` values of the `ZRef.Synchronized`
 * with the specified functions.
 *
 * @ets_data_first dimap_
 */
export function dimap<A, B, C, D>(f: (c: C) => A, g: (b: B) => D) {
  return <RA, RB, EA, EB>(
    self: XSynchronized<RA, RB, EA, EB, A, B>
  ): XSynchronized<RA, RB, EA, EB, C, D> => dimap_(self, f, g)
}