/**
 * Atomically modifies the `Ref.Synchronized` with the specified function.
 *
 * @tsplus fluent ets/Ref/Synchronized update
 */
export function update_<A>(
  self: SynchronizedRef<A>,
  f: (a: A) => A,
  __tsplusTrace?: string
): Effect.UIO<void> {
  return self.modify(v => Tuple(undefined, f(v)))
}

/**
 * Atomically modifies the `Ref.Synchronized` with the specified function.
 *
 * @tsplus static ets/Ref/Synchronized/Aspects update
 */
export const update = Pipeable(update_)
