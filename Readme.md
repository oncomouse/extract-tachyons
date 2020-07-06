# Extract Tachyons

Build the custom [Tachyons](http://tachyons.io/) that *your project* needs!

Tachyons is an amazing system of functional CSS classes, and even though it's extremely focused, the whole package still adds ~14KB of gzipped CSS to a project. Wouldn't it be nice to have a custom Tachyons bundle that only uses the classes your project is actually using?

Enter **Extract Tachyons**.

Extract Tachyons is a command line tool that reads HTML files, extracts the CSS classes in them, and builds a custom Tachyons file that only contains the classes you are actually using. Processing your files this way will *dramatically* reduce file sizes in projects that use Tachyons!

## Installation

To install, run `yarn add -D @oncomouse/extract-tachyons` or `npm install -D @oncomouse/extract-tachyons` in a Node.js project.

## Usage

From the command line: `npx extract-tachyons [--compress] [--output <file>] build/**/*.html`

* `--compress` will shrink the output with [CSSNano](https://cssnano.co/).
* `--output <file>` will write the output to `<file>` (default is to print to STDOUT)
* `--always <list>` will always include the classes in `<list>`
	* `<list>` is comma separated: `black,hover-black` or `orange, ms-3`
* `--never <list>` will never include the classes in `<list>`
	* `<list>` is comma separated: `black,hover-black` or `orange, ms-3`

## Note

It's probably a good idea to only use the output of Extract Tachyons in production. You never know when you will need to add new classes to your project!
