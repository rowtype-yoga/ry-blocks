import * as CSF from '@storybook/csf-tools';

export const parseCsf = code => options => () => CSF.loadCsf(code,options).parse()

export const getStoryNames = csf => () => Object.keys(csf._stories)

export const setStoryCode = ({ storyName, code }) => csf => () => {
    console.log("schdori", JSON.stringify(csf._stories[storyName], null ,2))
    //docs: {
    //   source: {
    //     code: 'some string here'
    //   }
    // }
    if(!csf._stories[storyName]) return csf;
    if(!csf._stories[storyName].parameters) { csf._stories[storyName].parameters = {} }
    if(!csf._stories[storyName].parameters.docs) { csf._stories[storyName].parameters.docs = {} }
    if(!csf._stories[storyName].parameters.docs.source) { csf._stories[storyName].parameters.docs.source = {} }
    csf._stories[storyName].parameters.docs.source.code = code
    return csf
}
