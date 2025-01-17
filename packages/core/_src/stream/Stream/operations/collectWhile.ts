import { concreteStream, StreamInternal } from "@effect/core/stream/Stream/operations/_internal/StreamInternal"

/**
 * Transforms all elements of the stream for as long as the specified partial
 * function is defined.
 *
 * @tsplus fluent ets/Stream collectWhile
 */
export function collectWhile_<R, E, A, A1>(
  self: Stream<R, E, A>,
  pf: (a: A) => Option<A1>,
  __tsplusTrace?: string
): Stream<R, E, A1> {
  const loop: Channel<
    R,
    E,
    Chunk<A>,
    unknown,
    E,
    Chunk<A1>,
    unknown
  > = Channel.readWith(
    (input: Chunk<A>) => {
      const mapped = input.collectWhile(pf)
      return mapped.size === input.size
        ? Channel.write(mapped) > loop
        : Channel.write(mapped)
    },
    (err) => Channel.fail(err),
    (done) => Channel.succeed(done)
  )
  concreteStream(self)
  return new StreamInternal(self.channel >> loop)
}

/**
 * Transforms all elements of the stream for as long as the specified partial
 * function is defined.
 *
 * @tsplus static ets/Stream/Aspects collectWhile
 */
export const collectWhile = Pipeable(collectWhile_)
