/**
 * Returns a `Cause` that has been stripped of all tracing information.
 *
 * @tsplus fluent ets/Cause untraced
 */
export function untraced<E>(self: Cause<E>): Cause<E> {
  return self.mapTrace(() => Trace.none)
}
