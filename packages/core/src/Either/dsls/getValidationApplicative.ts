// ets_tracing: off

import * as DSL from "../../PreludeV2/DSL/index.js"
import { Applicative, Fail, Monad, Run } from "../instances.js"

export const getValidationApplicative = DSL.getValidationF({
  ...Monad,
  ...Run,
  ...Fail,
  ...Applicative
})
