// ets_tracing: off

import "../Operator/index.js"

import { pipe } from "../Function"
import * as DSL from "../Prelude/DSL/index.js"
import * as P from "../Prelude/index.js"

export interface StateFn<A, B> {
  (a: A): B
}

export interface StateT<F extends P.HKT, S> extends P.HKT {
  readonly type: StateFn<S, P.Kind<F, this["R"], this["E"], readonly [S, this["A"]]>>
}

export interface State<F extends P.HKT, S> extends P.Typeclass<StateT<F, S>> {
  readonly get: P.Kind<StateT<F, S>, unknown, never, S>

  readonly update: (
    f: (s: S) => S
  ) => <R, E, A>(fa: P.Kind<StateT<F, S>, R, E, A>) => P.Kind<StateT<F, S>, R, E, A>

  readonly runState: (
    s: S
  ) => <R, E, A>(fa: P.Kind<StateT<F, S>, R, E, A>) => P.Kind<F, R, E, A>
}

export function stateT<S>() {
  return <F extends P.HKT>(F_: P.Monad<F>) => {
    const succeed = DSL.succeedF(F_)
    const monad: P.Monad<StateT<F, S>> = {
      any: () => (s) => succeed([s, {} as unknown] as const),
      map: (f) => (fa) => (s) =>
        pipe(
          fa(s),
          F_.map(([s, a]) => [s, f(a)])
        ),
      flatten: (ffa) => (s) =>
        pipe(
          ffa(s),
          F_.map(([s2, fa]) => fa(s2)),
          F_.flatten
        )
    }
    const state: State<F, S> = {
      update: (f) => (fa) => (s) =>
        pipe(
          fa(s),
          F_.map(([s, a]) => [f(s), a])
        ),
      get: (s) => succeed([s, s]),
      runState: (s) => (fa) =>
        pipe(
          fa(s),
          F_.map(([_, a]) => a)
        )
    }
    return P.intersect(monad, state)
  }
}
