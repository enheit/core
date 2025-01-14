import type { Lazy } from "@tsplus/stdlib/data/Function"

/**
 * @tsplus type ets/Logger
 */
export interface Logger<Message, Output> {
  readonly apply: (
    trace: TraceElement,
    fiberId: FiberId,
    logLevel: LogLevel,
    message: Lazy<Message>,
    cause: Lazy<Cause<unknown>>,
    context: ImmutableMap<FiberRef<unknown, unknown>, unknown>,
    spans: List<LogSpan>,
    annotations: ImmutableMap<string, string>
  ) => Output
}

/**
 * @tsplus type ets/Logger/Ops
 */
export interface LoggerOps {
  $: LoggerAspects
}
export const Logger: LoggerOps = {
  $: {}
}

/**
 * @tsplus type ets/Logger/Aspects
 */
export interface LoggerAspects {}
