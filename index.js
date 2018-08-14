const { JSDOM } = require('jsdom');
const postcss = require('postcss');
const fs = require('fs');
// Read CSS files as text:
require.extensions['.css'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
const tachyonsCSS = require('tachyons-custom/css/tachyons.css');
const tachyonsImageCSS = require('tachyons-images/css/tachyons-images.min.css');
const tachyonsBoxSizingCSS = require('tachyons-box-sizing/css/tachyons-box-sizing.min.css');
const normalizeCSS = require('normalize.css/normalize.css');

// Extract all CSS classes from an HTML file.
// This can probably be done without JSDOM, but it seems more reliable than
// to use Regex or something like that:
function extractClasses(html) {
  const document = (new JSDOM(html)).window.document;

  const htmlClasses = [];
  const elements = document.getElementsByTagName('*');

  Array.from(elements).forEach((element) => {
    const classes = element.className.length ? element.className.split(' ') : [];
    htmlClasses.push(
      ... classes.filter(name => name.length > 0 && htmlClasses.indexOf(name) === -1),
    );
  });
  return htmlClasses;
}

function extractTachyons(htmlClasses) {
  // Use PostCSS's AST to build the list of Tachyons used in the html files:
  const tachyonsAST = postcss.parse(tachyonsCSS);
  const rootCSS = [];
  const mediaQueries = {};
  // Extract a list of all classes in Tachyons:
  // const tachyonsClasses = [];
  // tachyonsAST.walkRules(/^\./, (rule) => {
  //   const outRule = rule.selector.replace(/\s+$/,'').replace(/^\./,'');
  //   if(tachyonsClasses.indexOf(outRule) === -1) {
  //     tachyonsClasses.push(outRule);
  //   }
  // });

  // Extract a list of media queries:
  tachyonsAST.walkAtRules('media', (rule) => {
    mediaQueries[rule.params] = [];
  });
  // Walk our classes and, if they are defined in Tachyons, add them to our custom
  // file:
  htmlClasses.forEach((cssClass) => {
    tachyonsAST.walkRules(`.${cssClass}`, (rule) => {
      if(rule.parent.type === 'root') {
        rootCSS.push(rule.toString());
      } else {
        mediaQueries[rule.parent.params].push(rule.toString());
      }
    });
  });

  // Define our output and include some reset code:
  const customCSS = `${normalizeCSS}
${tachyonsBoxSizingCSS}
${tachyonsImageCSS}
${rootCSS.join('\n')}
${Object.keys(mediaQueries).filter(x => mediaQueries[x].length !== 0).map(key => `@media ${key} {
${mediaQueries[key].join('\n')}
}`).join('\n')}`;

  return customCSS;

}

module.exports = {
  extractTachyons,
  extractClasses
};
