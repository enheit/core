import { Effect } from "../../Effect"
import { Managed } from "../definition"

/**
 * Returns a `Managed` that never acquires a resource.
 *
 * @tsplus static ets/ManagedOps never
 */
export const never: Managed<unknown, never, never> = Managed.fromEffect(Effect.never)