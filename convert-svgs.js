const path = require('path');
const svg2psreact = require("svg2psreact");

const assetsDir = path.join(__dirname, 'src', 'Yoga', 'Block', 'Icon', 'SVG');

svg2psreact.convertAllSVGsInDirectory("Yoga.Block.Icon.SVG", assetsDir)
