/**
 * Returns an effect that ignores errors and runs repeatedly until it
 * eventually succeeds.
 *
 * @tsplus fluent ets/Effect eventually
 */
export function eventually<R, E, A>(
  self: Effect<R, E, A>,
  __tsplusTrace?: string
): Effect.RIO<R, A> {
  return self | (Effect.yieldNow > self.eventually())
}
