import { indexer } from './purescript-indexer'

export default {
  staticDirs: ['../assets'],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  stories: ["../output/Story.*/index.js"],
  framework: "@storybook/react-webpack5",
  storyIndexers: [{ test: /..\/output\/.*/, indexer }],
  disableTelemetry: true,
}
