import type { Duration } from "../../data/Duration"
import type { Has } from "../../data/Has"
import { tag } from "../../data/Has"
import type { UIO } from "../Effect"
import { Effect } from "../Effect"
import { AbstractClock } from "./definition"

export const TestClockId = Symbol.for("@effect-ts/system/io/TestClock")
export type TestClockId = typeof TestClockId

export const HasTestClock = tag<TestClock>(TestClockId)
export type HasTestClock = Has<TestClock>

export class TestClock extends AbstractClock {
  private time = new Date().getTime()

  readonly currentTime: UIO<number> = Effect.succeed(this.time)

  sleep(ms: number, __etsTrace?: string): UIO<void> {
    return Effect.unit
  }

  adjust(duration: Duration): UIO<void> {
    return Effect.succeed(() => {
      this.time = this.time + duration.milliseconds
    })
  }
}