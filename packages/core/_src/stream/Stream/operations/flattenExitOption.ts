import { concreteStream, StreamInternal } from "@effect/core/stream/Stream/operations/_internal/StreamInternal"

/**
 * Unwraps `Exit` values that also signify end-of-stream by failing with `None`.
 *
 * For `Exit<E, A>` values that do not signal end-of-stream, prefer:
 *
 * ```typescript
 * stream.mapEffect((exit) => Effect.done(exit))
 * ```
 *
 * @tsplus fluent ets/Stream flattenExitOption
 */
export function flattenExitOption<R, E, A>(
  self: Stream<R, E, Exit<Option<E>, A>>,
  __tsplusTrace?: string
): Stream<R, E, A> {
  const process: Channel<
    R,
    E,
    Chunk<Exit<Option<E>, A>>,
    unknown,
    E,
    Chunk<A>,
    unknown
  > = Channel.readWithCause(
    (chunk: Chunk<Exit<Option<E>, A>>) => processChunk(chunk, process),
    (cause) => Channel.failCause(cause),
    () => Channel.unit
  )
  concreteStream(self)
  return new StreamInternal(self.channel >> process)
}

function processChunk<R, E, A>(
  chunk: Chunk<Exit<Option<E>, A>>,
  cont: Channel<R, E, Chunk<Exit<Option<E>, A>>, unknown, E, Chunk<A>, unknown>
): Channel<R, E, Chunk<Exit<Option<E>, A>>, unknown, E, Chunk<A>, unknown> {
  const {
    tuple: [toEmit, rest]
  } = chunk.splitWhere((exit) => !exit.isSuccess())
  const next = rest.head.fold(cont, (exit) =>
    exit.fold(
      (cause) => Cause.flipCauseOption(cause).fold(Channel.unit, (cause) => Channel.failCause(cause)),
      () => Channel.unit
    ))
  return (
    Channel.write(
      toEmit.collect((exit) => exit.isSuccess() ? Option.some(exit.value) : Option.none)
    ) > next
  )
}
