# cordova-plugin-exclude-files

A cordova plugin that allows to exclude files from the build.


## Installation

```shell
cordova plugin add cordova-plugin-exclude-files
```


## Usage

Configure which files to exclude from the build, by adding any number of `<exclude-files>` elements to your `config.xml`:

```xml
<exclude-files pattern="**/*.scss" />
```

Patterns are [globs](https://github.com/isaacs/node-glob#glob-primer) that are resolved relative to the `www` directory.


## How it works

Files that match the given patterns will be removed by an `after_prepare` hook.
This seems to be the only safe method of doing this at the moment of writing.

This means that cordova will first copy *everything* from `www` to the platform directories and then the files matched by this plugin will be deleted from there.
But it also means that cordova prepare will not run any faster if you exclude huge files using this plugin.


## Compatibility

Tested with `cordova@6.5.0` and `node@6.9.5`.
Makes use of ES6 features, so it probably will not run on node versions lower than `6.x`.

## License

`cordova-plugin-exclude-files` is licensed under the MIT License.

Copyright (c) 2017 Raphael von der Grün
