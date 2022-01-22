// ets_tracing: off

import type { Either } from "@effect-ts/system/Either"

import type * as HKT from "../HKT/index.js"

export interface AssociativeEither<F extends HKT.HKT> extends HKT.Typeclass<F> {
  readonly orElseEither: <R2, E2, B>(
    fb: () => HKT.Kind<F, R2, E2, B>
  ) => <R, E, A>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R2 & R, E2 | E, Either<A, B>>
}
