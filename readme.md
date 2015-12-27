# got-github-blob-cli [![Build Status](https://travis-ci.org/ragingwind/got-github-blob-cli.svg?branch=master)](https://travis-ci.org/ragingwind/got-github-blob-cli)

> Got a blob from github on CLI


## Uses

```
$ npm install --global got-github-blob-cli
```

```sh
$ got-github-blob --help

  Usage
    $ got-github-blob <URLs or JSON>

  Options
    --dest Root path for downloading, if is not set? current path will be root
    --verbose Show log

  Examples
    $ got-github-blob https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/app.js https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/src/platform/config.xml
    $ got-github-blob --dest=./.tmp https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js
    $ got-github-blob --dest=./.tmp patch.json
```

## License

MIT © [ragingwind](http://ragingwind.me)
