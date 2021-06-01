import logo from './logo.svg';
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorSecondary: "#271C5A",
  colorPrimary: "#5B43D0",

  // UI
  // appBg: '#10354a',
  // appContentBg: '#203f50',
  // appBorderColor: '#002334',

  // Typography
  fontBase: '"Inter V", Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, Arial, sans-serif',
  fontCode: '"VictorMono", monospace',

  // Text colors
  textColor: 'black',

  textInverseColor: 'rgba(255,255,255,0.9)',

  brandTitle: 'Rowtype Yoga',
  brandUrl: 'https://rowtype.yoga',
  brandImage: logo,
});
