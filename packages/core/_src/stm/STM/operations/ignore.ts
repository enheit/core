/**
 * Returns a new effect that ignores the success or failure of this effect.
 *
 * @tsplus fluent ets/STM ignore
 */
export function ignore<R, E, A>(self: STM<R, E, A>): STM<R, never, void> {
  return self.fold(() => undefined, () => undefined)
}
