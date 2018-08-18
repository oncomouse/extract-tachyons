var { expect } = require('chai');
var {
  extractTachyons,
  extractClasses,
} = require('../../index');
const fs = require('fs');
// Read CSS files as text:
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var testHtml = require('../fixtures/index.html');

describe('extractTachyons()', () => {
  it('should extract css');
});
describe('extractClasses()', () => {
  var noCssClassesHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <div>Foobar</div>
  <span class="">Baz</span>
</body>
</html>`;
  it('should return a blank array when given HTML w/ no classes', () => {
    expect(extractClasses(noCssClassesHTML)).to.deep.equal([]);
  });
});
