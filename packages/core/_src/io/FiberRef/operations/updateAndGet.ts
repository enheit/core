/**
 * Atomically modifies the `FiberRef` with the specified function and
 * returns the result.
 *
 * @tsplus fluent ets/FiberRef updateAndGet
 */
export function updateAndGet_<A, P>(
  self: FiberRef<A, P>,
  f: (a: A) => A,
  __tsplusTrace?: string
): Effect.UIO<A> {
  return self.modify((v) => {
    const result = f(v)
    return Tuple(result, result)
  })
}

/**
 * Atomically modifies the `FiberRef` with the specified function and
 * returns the result.
 *
 * @tsplus static ets/FiberRef/Aspects updateAndGet
 */
export const updateAndGet = Pipeable(updateAndGet_)
