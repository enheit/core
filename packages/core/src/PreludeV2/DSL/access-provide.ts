// ets_tracing: off

import { pipe } from "../../Function/index.js"
import type { Has, Tag } from "../../Has/index.js"
import type { AssociativeFlatten } from "../AssociativeFlatten/index.js"
import type { Access, Provide } from "../FX/index.js"
import type * as HKT from "../HKT/index.js"
import type { Monad } from "../Monad/index.js"

export function accessMF<F extends HKT.HKT>(F_: Access<F> & AssociativeFlatten<F>) {
  return <R, R2, E, A>(
    f: (r: R2) => HKT.Kind<F, R, E, A>
  ): HKT.Kind<F, R & R2, E, A> => {
    return pipe(f, F_.access, F_.flatten)
  }
}

export function accessServiceMF<F extends HKT.HKT>(M_: Access<F> & Monad<F>) {
  return <Service>(H: Tag<Service>) =>
    <R, E, A>(
      f: (_: Service) => HKT.Kind<F, R, E, A>
    ): HKT.Kind<F, R & Has<Service>, E, A> =>
      accessMF(M_)((x: Has<Service>) => pipe(x, H.read, f))
}

export const provideServiceF =
  <F extends HKT.HKT>(M_: Access<F> & Monad<F> & Provide<F>) =>
  <Service>(H: Tag<Service>) =>
  (S: Service) =>
  <R, E, A>(fa: HKT.Kind<F, R & Has<Service>, E, A>): HKT.Kind<F, R, E, A> =>
    accessMF(M_)((r: R) =>
      pipe(fa, M_.provide({ ...r, [H.key]: S } as unknown as R & Has<Service>))
    )

export const provideSomeF =
  <F extends HKT.HKT>(M_: Access<F> & Monad<F> & Provide<F>) =>
  <R, R2>(f: (_: R2) => R) =>
  <E, A>(fa: HKT.Kind<F, R, E, A>): HKT.Kind<F, R2, E, A> =>
    accessMF(M_)((r0: R2) => pipe(fa, M_.provide(f(r0))))
