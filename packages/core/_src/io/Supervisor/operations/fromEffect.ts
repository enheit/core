import { ConstSupervisor } from "@effect/core/io/Supervisor/operations/const"

/**
 * @tsplus static ets/SupervisorOps fromEffect
 */
export function fromEffect<A>(effect: Effect.UIO<A>): Supervisor<A> {
  return new ConstSupervisor(effect)
}
