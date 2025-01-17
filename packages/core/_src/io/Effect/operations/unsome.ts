/**
 * Converts an option on errors into an option on values.
 *
 * @tsplus fluent ets/Effect unsome
 */
export function unsome<R, E, A>(
  self: Effect<R, Option<E>, A>,
  __tsplusTrace?: string
): Effect<R, E, Option<A>> {
  return self.foldEffect(
    (option) => option.fold(Effect.succeedNow(Option.none), Effect.failNow),
    (a) => Effect.succeedNow(Option.some(a))
  )
}
