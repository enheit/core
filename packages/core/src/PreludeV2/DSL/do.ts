// ets_tracing: off

import { pipe } from "../../Function/index.js"
import type * as HKT from "../HKT/index.js"
import type { Monad } from "../Monad/index.js"
import { chainF } from "./chain.js"
import { succeedF } from "./succeed.js"

export interface DoF<F extends HKT.HKT> {
  do: HKT.Kind<F, unknown, never, {}>
  bind: <N extends string, R, E, A, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
    fn: (_: Scope) => HKT.Kind<F, R, E, A>
  ) => <R0, E0>(
    self: HKT.Kind<F, R0, E0, Scope>
  ) => HKT.Kind<
    F,
    R & R0,
    E | E0,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : A
    }
  >
  let: <N extends string, B, Scope>(
    name: N extends keyof Scope ? { error: `binding name '${N}' already in use` } : N,
    fn: (_: Scope) => B
  ) => <R, E>(
    self: HKT.Kind<F, R, E, Scope>
  ) => HKT.Kind<
    F,
    R,
    E,
    {
      readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
    }
  >
}

export function getDo<F extends HKT.HKT>(F_: Monad<F>): DoF<F> {
  return {
    do: succeedF(F_)({}),
    bind:
      <N extends string, R, E, A, Scope>(
        name: N extends keyof Scope
          ? { error: `binding name '${N}' already in use` }
          : N,
        fn: (_: Scope) => HKT.Kind<F, R, E, A>
      ) =>
      <R0, E0>(self: HKT.Kind<F, R0, E0, Scope>) =>
        pipe(
          self,
          chainF(F_)((scope) =>
            pipe(
              fn(scope),
              F_.map(
                (a) =>
                  ({ ...scope, [name as string]: a } as {
                    readonly [k in N | keyof Scope]: k extends keyof Scope
                      ? Scope[k]
                      : A
                  })
              )
            )
          )
        ),
    let:
      <N extends string, B, Scope>(
        name: N extends keyof Scope
          ? { error: `binding name '${N}' already in use` }
          : N,
        fn: (_: Scope) => B
      ) =>
      <R, E>(
        self: HKT.Kind<F, R, E, Scope>
      ): HKT.Kind<
        F,
        R,
        E,
        {
          readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
        }
      > =>
        pipe(
          self,
          F_.map((k) =>
            Object.assign({}, k, { [name as string]: fn(k) } as {
              readonly [k in N | keyof Scope]: k extends keyof Scope ? Scope[k] : B
            })
          )
        )
  }
}
