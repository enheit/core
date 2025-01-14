/**
 * Creates a stream that executes the specified effect but emits no elements.
 *
 * @tsplus static ets/Stream/Ops execute
 */
export function execute<R, E, Z>(
  effect: LazyArg<Effect<R, E, Z>>,
  __tsplusTrace?: string
): Stream<R, E, never> {
  return Stream.fromEffect(effect).drain()
}
