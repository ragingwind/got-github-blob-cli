#!/usr/bin/env node

'use strict';

const meow = require('meow');
const path = require('path');
const got = require('got-github-blob');
const urlRegex = require('url-regex');

const cli = meow([
	'Usage',
	'  $ got-github-blob <URLs or JSON>',
	'',
	'Options',
	'  --dest Root path for downloading',
	'  --verbose Show log',
	'',
	'Examples',
	'  $ got-github-blob https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/app.js https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/src/platform/config.xml',
	'  $ got-github-blob --dest=./.tmp https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js',
	'  $ got-github-blob --manifest=patch.json --dest=./.tmp'
]);

if (cli.input.length <= 0) {
	cli.showHelp(-1);
}

const req = [];

for (const i of cli.input) {
	if (urlRegex().test(i)) {
		req.push(got(i, cli.flags.dest));
	} else {
		let manifest = [];

		try {
			manifest = require(path.resolve(process.cwd(), i));
		} catch (e) {
			console.error('Invalid JSON manifest');
		}

		for (const m of manifest) {
			req.push(got(m, cli.flags.dest));
		}
	}
}

Promise.all(req).then(res => {
	if (cli.flags.verbose) {
		for (const r of res) {
			console.log('Got', r.url.href, 'to', r.dest);
		}
	}
}, function (e) {
	console.error(e);
});
