import test from 'ava';
import execa from 'execa';
import fs from 'fs';
import os from 'os';
import path from 'path';
import rimraf from 'rimraf';
import pathize from 'pathize-github-url';

const tmp = os.tmpdir();
const manifest = [
	'https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/app.js',
	'https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js',
	'https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/src/platform/config.xml'
];

test.beforeEach('clean up dest', t => {
	// clean up dest
	for (const m of manifest) {
		var p = pathize(m);
		rimraf.sync(path.join(tmp, p.dir ? path.join(p.dir, p.base) : p.base));
	}
	t.end();
});

test(async t => {
	var std = await execa('./cli.js', manifest.concat(['--verbose', '--dest=' + tmp]));
	t.ok(fs.lstatSync(path.join(tmp, 'app.js')).isFile());
	t.ok(fs.lstatSync(path.join(tmp, 'gulpfile.js')).isFile());
	t.ok(fs.lstatSync(path.join(tmp, 'src/platform/config.xml')).isFile());
	t.end();
});

test(async t => {
	var std = await execa('./cli.js', ['--verbose', '--dest=' + tmp, './fixtures/patch.json']);
	t.ok(fs.lstatSync(path.join(tmp, 'app.js')).isFile());
	t.ok(fs.lstatSync(path.join(tmp, 'gulpfile.js')).isFile());
	t.ok(fs.lstatSync(path.join(tmp, 'src/platform/config.xml')).isFile());
	t.end();
});
