describe.concurrent("Stream", () => {
  describe.concurrent("partitionEither", () => {
    it("allows repeated runs without hanging", async () => {
      const stream = Stream.fromCollection(Chunk.empty<number>())
        .partitionEither((i) => Effect.succeedNow(i % 2 === 0 ? Either.left(i) : Either.right(i)))
        .map(({ tuple: [evens, odds] }) => evens.mergeEither(odds))
        .flatMap((stream) => stream.runCollect())
      const program = Effect.collectAll(
        Chunk.range(0, 50).map(() => Effect.scoped(stream))
      ).map(() => 0)

      const result = await program.unsafeRunPromise()

      assert.strictEqual(result, 0)
    })

    it("values", async () => {
      const program = Effect.scoped(
        Stream.range(0, 6)
          .partitionEither((i) =>
            i % 2 === 0
              ? Effect.succeedNow(Either.left(i))
              : Effect.succeedNow(Either.right(i))
          )
          .flatMap(({ tuple: [evens, odds] }) =>
            Effect.struct({
              evens: evens.runCollect(),
              odds: odds.runCollect()
            })
          )
      )

      const { evens, odds } = await program.unsafeRunPromise()

      assert.isTrue(evens == Chunk(0, 2, 4))
      assert.isTrue(odds == Chunk(1, 3, 5))
    })

    it("errors", async () => {
      const program = Effect.scoped(
        (Stream.range(0, 1) + Stream.fail("boom"))
          .partitionEither((i) =>
            i % 2 === 0
              ? Effect.succeedNow(Either.left(i))
              : Effect.succeedNow(Either.right(i))
          )
          .flatMap(({ tuple: [evens, odds] }) =>
            Effect.struct({
              evens: evens.runCollect().either(),
              odds: odds.runCollect().either()
            })
          )
      )

      const { evens, odds } = await program.unsafeRunPromise()

      assert.isTrue(evens == Either.left("boom"))
      assert.isTrue(odds == Either.left("boom"))
    })

    it("backpressure", async () => {
      const program = Effect.scoped(
        Stream.range(0, 6)
          .partitionEither(
            (i) =>
              i % 2 === 0
                ? Effect.succeedNow(Either.left(i))
                : Effect.succeedNow(Either.right(i)),
            1
          )
          .flatMap(({ tuple: [evens, odds] }) =>
            Effect.Do()
              .bind("ref", () => Ref.make<List<number>>(List.empty()))
              .bind("latch", () => Deferred.make<never, void>())
              .bind("fiber", ({ latch, ref }) =>
                evens
                  .tap(
                    (i) =>
                      ref.update((list) => list.prepend(i)) >
                        Effect.when(i === 2, latch.succeed(undefined))
                  )
                  .runDrain()
                  .fork())
              .tap(({ latch }) => latch.await())
              .bind("snapshot1", ({ ref }) => ref.get())
              .bind("other", () => odds.runCollect())
              .tap(({ fiber }) => fiber.await())
              .bind("snapshot2", ({ ref }) => ref.get())
          )
      )

      const { other, snapshot1, snapshot2 } = await program.unsafeRunPromise()

      assert.isTrue(snapshot1 == List(2, 0))
      assert.isTrue(snapshot2 == List(4, 2, 0))
      assert.isTrue(other == Chunk(1, 3, 5))
    })
  })
})
