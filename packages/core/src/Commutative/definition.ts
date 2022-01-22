// ets_tracing: off

import type { Associative } from "../Associative/index.js"
import type { HKT } from "../PreludeV2/index.js"

/**
 * The `Commutative[A]` type class describes a commutative binary operator
 * for a type `A`. For example, addition for integers.
 */
export interface Commutative<A> extends Associative<A> {
  readonly _Commutative: "Commutative"

  readonly commute: (x: A, y: A) => A
}

export interface CommutativeF extends HKT {
  readonly type: Commutative<this["A"]>
}
