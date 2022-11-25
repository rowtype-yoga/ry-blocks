import { SourceMapConsumer } from "source-map"

export const withSourceMapConsumerImpl =
  (fn, data) => SourceMapConsumer.with(data, null, fn)
