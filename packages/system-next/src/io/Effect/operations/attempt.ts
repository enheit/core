import type { LazyArg } from "../../../data/Function"
import { fail as exitFail } from "../../Exit"
import { Effect, EffectError } from "../definition"

/**
 * Imports a synchronous side-effect into a pure `Effect` value, translating any
 * thrown exceptions into typed failed effects creating with `Effect.fail`.
 *
 * @ets static ets/EffectOps attempt
 */
export function attempt<A>(
  f: LazyArg<A>,
  __etsTrace?: string
): Effect<unknown, unknown, A> {
  return Effect.succeedWith((runtimeConfig) => {
    try {
      return f()
    } catch (error) {
      if (!runtimeConfig.value.fatal(error)) {
        throw new EffectError(exitFail(error), __etsTrace)
      }
      throw error
    }
  })
}