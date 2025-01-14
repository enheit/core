/**
 * Zips this stream together with the index of elements.
 *
 * @tsplus fluent ets/Stream zipWithIndex
 */
export function zipWithIndex_<R, E, A>(
  self: Stream<R, E, A>,
  __tsplusTrace?: string
): Stream<R, E, Tuple<[A, number]>> {
  return self.mapAccum(0, (index, a) => Tuple(index + 1, Tuple(a, index)))
}
