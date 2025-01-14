import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @tsplus fluent Chunk reduceWhileEffect
 */
export function reduceWhileEffect_<A, R, E, S>(
  self: Chunk<A>,
  s: S,
  pred: (s: S) => boolean,
  f: (s: S, a: A) => Effect<R, E, S>,
  __tsplusTrace?: string
): Effect<R, E, S> {
  const iterator = concreteChunkId(self)._arrayLikeIterator()
  const next = iterator.next()

  if (next.done) {
    return Effect.succeedNow(s)
  } else {
    const array = next.value
    const length = array.length

    return loop(s, iterator, array, 0, length, pred, f)
  }
}

/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @tsplus static Chunk/Aspects reduceWhileEffect
 */
export const reduceWhileEffect = Pipeable(reduceWhileEffect_)

function loop<A, R, E, S>(
  s: S,
  iterator: Iterator<ArrayLike<A>, any, undefined>,
  array: ArrayLike<A>,
  i: number,
  length: number,
  pred: (s: S) => boolean,
  f: (s: S, a: A) => Effect<R, E, S>,
  __tsplusTrace?: string
): Effect<R, E, S> {
  if (i < length) {
    if (pred(s)) {
      return f(s, array[i]!).flatMap((s1) => loop(s1, iterator, array, i + 1, length, pred, f))
    } else {
      return Effect.succeedNow(s)
    }
  } else {
    const next = iterator.next()

    if (next.done) {
      return Effect.succeedNow(s)
    } else {
      const arr = next.value
      return Effect.suspendSucceed(loop(s, iterator, arr, 0, arr.length, pred, f))
    }
  }
}
