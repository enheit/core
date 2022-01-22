// ets_tracing: off

import type { Predicate, Refinement } from "../../Function/index.js"
import type * as HKT from "../HKT/index.js"

export interface Filter<F extends HKT.HKT> extends HKT.Typeclass<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => HKT.Kind<F, R, E, B>
    <A>(predicate: Predicate<A>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => HKT.Kind<F, R, E, A>
  }
}
