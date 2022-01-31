import * as E from "../../../data/Either"
import type { RIO } from "../definition"
import { Effect } from "../definition"

/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail, because the failure case has
 * been exposed as part of the `Either` success case.
 *
 * This method is useful for recovering from effects that may fail.
 *
 * The error parameter of the returned `Effect` is `never`, since it is
 * guaranteed the effect does not model failure.
 *
 * @ets fluent ets/Effect either
 */
export function either<R, E, A>(
  self: Effect<R, E, A>,
  __etsTrace?: string
): RIO<R, E.Either<E, A>> {
  return self.foldEffect(
    (e) => Effect.succeedNow(E.left(e)),
    (a) => Effect.succeedNow(E.right(a))
  )
}