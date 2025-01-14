/**
 * Checks whether the queue is currently full.
 *
 * @tsplus fluent ets/Queue isFull
 */
export function isFull<A>(self: Queue<A>, __tsplusTrace?: string): Effect.UIO<boolean> {
  return self.size.map((size) => size === self.capacity)
}
