import { getOrMakeEntry } from "@effect/core/stm/TRef/operations/_internal/getOrMakeEntry"

/**
 * Updates the value of the variable and returns the new value.
 *
 * @tsplus fluent ets/TRef updateAndGet
 */
export function updateAndGet_<A>(self: TRef<A>, f: (a: A) => A): USTM<A> {
  return STM.Effect((journal) => {
    const entry = getOrMakeEntry(self, journal)
    const newValue = entry.use((_) => f(_.unsafeGet()))
    entry.use((_) => _.unsafeSet(newValue))
    return newValue
  })
}

/**
 * Updates the value of the variable and returns the new value.
 *
 * @tsplus static ets/TRef/Aspects updateAndGet
 */
export const updateAndGet = Pipeable(updateAndGet_)
