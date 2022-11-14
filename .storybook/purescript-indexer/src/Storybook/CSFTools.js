import * as CSF from '@storybook/csf-tools';

export const parseCsf = code => options => () => CSF.loadCsf(code, options).parse()

export const formatCsf = file => () => CSF.formatCsf(file)

export const getStoryNames = csf => () => Object.keys(csf._stories)

export const setStoryCode = ({ storyName, code }) => csf => () => {
  if (!csf._stories[storyName]) return csf;
  if (!csf._stories[storyName].parameters) { csf._stories[storyName].parameters = {} }
  if (!csf._stories[storyName].parameters.docs) { csf._stories[storyName].parameters.docs = {} }
  if (!csf._stories[storyName].parameters.docs.source) { csf._stories[storyName].parameters.docs.source = {} }
  csf._stories[storyName].parameters.docs.source.code = code
  return csf
}
