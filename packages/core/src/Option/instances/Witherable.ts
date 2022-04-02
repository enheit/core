// ets_tracing: off

import * as P from "../../Prelude/index.js"
import type { OptionF } from "../definitions.js"
import { compactF } from "../operations/compactF.js"

export const Witherable = P.instance<P.Witherable<OptionF>>({
  compactF
})
