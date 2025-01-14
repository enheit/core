import { concreteStream, StreamInternal } from "@effect/core/stream/Stream/operations/_internal/StreamInternal"

/**
 * Returns a lazily constructed stream.
 *
 * @tsplus static ets/Stream/Ops suspend
 */
export function suspend<R, E, A>(
  stream: LazyArg<Stream<R, E, A>>,
  __tsplusTrace?: string
): Stream<R, E, A> {
  return new StreamInternal(
    Channel.suspend(() => {
      const stream0 = stream()
      concreteStream(stream0)
      return stream0.channel
    })
  )
}
