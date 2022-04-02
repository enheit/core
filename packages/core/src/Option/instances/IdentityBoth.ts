// ets_tracing: off

import * as P from "../../Prelude/index.js"
import type { OptionF } from "../definitions.js"
import { Any } from "./Any.js"
import { AssociativeBoth } from "./AssociativeBoth.js"

export const IdentityBoth = P.instance<P.IdentityBoth<OptionF>>({
  ...Any,
  ...AssociativeBoth
})
