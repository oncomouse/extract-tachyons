#!/usr/bin/env node

const union = require('./lib/union');

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const postcss = require('postcss');
  const cssnano = require('cssnano');
  const argv = require('minimist')(process.argv.slice(2), {
    boolean: [
      'compress',
    ],
    string: [
      'output',
      'o',
      'out',
    ],
    alias: {
      'output': [
        'o',
        'out',
      ],
    },
    default: {
      'output': null,
    },
  });
  const { extractClasses, extractTachyons } = require('./index');
  // Build a complete list of all CSS classes used in the supplied documents:
  const htmlClasses = argv._.reduce((acc, cur) => union(acc, extractClasses(fs.readFileSync(cur).toString())), []);
  const customCSS = extractTachyons(htmlClasses);

  function handleOutput(css) {
    if(argv.output === null) {
      console.log(css);
    } else {
      fs.writeFileSync(argv.output, css);
    }
  }

  // If we are compressing, run CSSNano, otherwise print:
  if(argv.compress) {
    postcss([cssnano({preset: 'default'})]).process(customCSS, { from: undefined }).then(result => handleOutput(result.css));
  } else {
    handleOutput(customCSS);
  }
}
