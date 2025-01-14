/**
 * @tsplus static ets/Random/Ops nextIntBetween
 */
export function nextIntBetween(low: number, high: number): Effect.UIO<number> {
  return Effect.randomWith((random) => random.nextIntBetween(low, high))
}
