/**
 * Lifts an `Option` into a `IO`. If the option is empty it succeeds with
 * `undefined`. If the option is defined it fails with an error adapted with
 * the specified function.
 *
 * @tsplus static ets/Effect/Ops noneOrFailWith
 */
export function noneOrFailWith<E, A>(
  option: LazyArg<Option<A>>,
  f: (a: A) => E,
  __tsplusTrace?: string
): Effect.IO<E, void> {
  return Effect.getOrFailDiscard(option).flip().mapError(f)
}
