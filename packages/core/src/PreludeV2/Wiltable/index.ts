// ets_tracing: off

import type { Either } from "@effect-ts/system/Either"

import type * as Tp from "../../Collections/Immutable/Tuple/index.js"
import type { Applicative } from "../Applicative/index.js"
import type * as HKT from "../HKT/index.js"

export interface Wilt<F extends HKT.HKT> {
  <G extends HKT.HKT>(F: Applicative<G>): <GR, GE, A, B, B2>(
    f: (a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>
  ) => <FR, FE>(
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, GR, GE, Tp.Tuple<[HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>>
}

export interface Wiltable<F extends HKT.HKT> extends HKT.Typeclass<F> {
  readonly separateF: Wilt<F>
}

export function implementSeparateF<F extends HKT.HKT>(): (
  i: <FR, FE, A, B, B2, G extends HKT.HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) => (
    G: Applicative<G>
  ) => (
    f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>
  ) => (
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, FR, FE, Tp.Tuple<[HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>>
) => Wilt<F>
export function implementSeparateF() {
  return (i: any) => i()
}
