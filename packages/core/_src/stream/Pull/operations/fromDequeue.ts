/**
 * @tsplus static ets/Pull/Ops fromDequeue
 */
export function fromDequeue<E, A>(
  queue: Dequeue<Take<E, A>>,
  __tsplusTrace?: string
): Effect.IO<Option<E>, Chunk<A>> {
  return queue.take.flatMap((take) => take.done())
}
