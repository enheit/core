// ets_tracing: off

import { pipe } from "@effect-ts/system/Function"
import * as I from "@effect-ts/system/Iterable"

import * as DSL from "../PreludeV2/DSL/index.js"
import * as P from "../PreludeV2/index.js"
import type { IterableF } from "./instances.js"

export * from "@effect-ts/system/Iterable"

/**
 * `ForEach`'s `forEachF` function
 */
export const forEachF = P.implementForEachF<IterableF>()(
  (_) => (G) => (f) =>
    I.reduce(DSL.succeedF(G)(I.never as Iterable<typeof _.B>), (b, a) =>
      pipe(
        b,
        G.both(f(a)),
        G.map(({ tuple: [x, y] }) => I.concat(x, I.of(y)))
      )
    )
)
