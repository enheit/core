import { getOrMakeEntry } from "@effect/core/stm/TRef/operations/_internal/getOrMakeEntry"

/**
 * Sets the value of the `TRef` and returns the old value.
 *
 * @tsplus fluent ets/TRef getAndSet
 */
export function getAndSet_<A>(self: TRef<A>, a: A): USTM<A> {
  return STM.Effect((journal) => {
    const entry = getOrMakeEntry(self, journal)
    const oldValue = entry.use((_) => _.unsafeGet<A>())
    entry.use((_) => _.unsafeSet(a))
    return oldValue
  })
}

/**
 * Sets the value of the `TRef` and returns the old value.
 *
 * @tsplus static ets/TRef/Aspects getAndSet
 */
export const getAndSet = Pipeable(getAndSet_)
