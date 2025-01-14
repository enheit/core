/**
 * Atomically modifies the `Ref` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 *
 * @tsplus fluent ets/Ref updateSome
 */
export function updateSome_<A>(
  self: Ref<A>,
  pf: (a: A) => Option<A>,
  __tsplusTrace?: string
): Effect.UIO<void> {
  return self.modify((v) => Tuple(undefined, pf(v).getOrElse(v)))
}

/**
 * Atomically modifies the `Ref` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 *
 * @tsplus static ets/Ref/Aspects updateSome
 */
export const updateSome = Pipeable(updateSome_)
