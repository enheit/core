/**
 * Makes a scope. Finalizers added to this scope will be run sequentially in
 * the reverse of the order in which they were added when this scope is
 * closed.
 *
 * @tsplus static ets/Scope/Ops make
 */
export const make: Effect.UIO<Scope.Closeable> = Scope.makeWith(ExecutionStrategy.Sequential)
