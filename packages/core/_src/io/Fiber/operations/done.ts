import { makeSynthetic } from "@effect/core/io/Fiber/definition"

/**
 * A fiber that is done with the specified `Exit` value.
 *
 * @tsplus static ets/Fiber/Ops done
 */
export function done<E, A>(exit: Exit<E, A>): Fiber<E, A> {
  return makeSynthetic({
    id: FiberId.none,
    await: Effect.succeedNow(exit),
    children: Effect.succeedNow(Chunk.empty()),
    inheritRefs: Effect.unit,
    poll: Effect.succeedNow(Option.some(exit)),
    interruptAs: () => Effect.succeedNow(exit)
  })
}
