import { loopOnPartialChunks } from "@effect/core/stream/Stream/operations/_internal/loopOnPartialChunks";

export function loopOnPartialChunksElements<R, E, A, R1, E1, A1>(
  self: Stream<R, E, A>,
  f: (a: A, emit: (a: A1) => Effect.UIO<void>) => Effect<R1, E1, void>,
  __tsplusTrace?: string
): Stream<R & R1, E | E1, A1> {
  return loopOnPartialChunks(self, (chunk, emit) => Effect.forEachDiscard(chunk, (value) => f(value, emit)).as(true));
}