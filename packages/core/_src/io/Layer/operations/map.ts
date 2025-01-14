/**
 * Returns a new layer whose output is mapped by the specified function.
 *
 * @tsplus fluent ets/Layer map
 */
export function map_<R, E, A, B>(self: Layer<R, E, A>, f: (a: Env<A>) => Env<B>): Layer<R, E, B> {
  return self.flatMap((a) => Layer.succeedEnvironment(f(a)))
}

/**
 * Returns a new layer whose output is mapped by the specified function.
 *
 * @tsplus static ets/Layer/Aspects map
 */
export const map = Pipeable(map_)
