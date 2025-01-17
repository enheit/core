export function zipRightChunks<A, B>(
  leftChunk: Chunk<A>,
  rightChunk: Chunk<B>
): Tuple<[Chunk<B>, Either<Chunk<A>, Chunk<B>>]> {
  const leftChunkSize = leftChunk.size
  const rightChunkSize = rightChunk.size
  return leftChunkSize > rightChunkSize
    ? Tuple(rightChunk, Either.left(leftChunk.drop(rightChunkSize)))
    : Tuple(
      rightChunk.take(leftChunkSize),
      Either.right(rightChunk.drop(leftChunkSize))
    )
}
