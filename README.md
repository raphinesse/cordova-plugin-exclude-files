# cordova-plugin-exclude-files [![Travis Badge]][Travis] [![AppVeyor Badge]][AppVeyor]

A cordova plugin that allows to exclude files from the build.

> This plugin does not work in PhoneGap Build [since they don't support cordova hooks][PGB].


## Installation

```shell
cordova plugin add cordova-plugin-exclude-files
```


## Usage

Configure which files to exclude from the build, by adding any number of `<exclude-files>` elements to your `config.xml`:

```xml
<exclude-files pattern="**/*.scss" />

<platform name="android">
    <exclude-files pattern="ios-only" />
</platform>
```

Patterns are [globs] that are resolved relative to the `www` directory.
Platform specific excludes are appended to the global excludes.


## How it works

Files that match the given patterns will be removed by an `after_prepare` hook.
This seems to be the only safe method of doing this at the moment of writing.

This means that cordova will first copy *everything* from `www` to the platform directories and then the files matched by this plugin will be deleted from there.
Consequently, you *cannot* speed up `cordova prepare` by excluding files using this plugin.


## Compatibility

Requires Cordova ≥ 8, Node.js ≥ 6.

- For Cordova < 8 use `cordova-plugin-exclude-files@^0.4.2`.
- For Node.js 4 use `cordova-plugin-exclude-files@^0.2.4`.

## License

`cordova-plugin-exclude-files` is licensed under the MIT License.

Copyright (c) 2017–2018 Raphael von der Grün


[globs]: https://github.com/isaacs/node-glob#glob-primer
[PGB]: https://github.com/phonegap/build/issues/425#issuecomment-93126212

[Travis Badge]: https://travis-ci.org/raphinesse/cordova-plugin-exclude-files.svg?branch=master
[Travis]: https://travis-ci.org/raphinesse/cordova-plugin-exclude-files

[AppVeyor Badge]: https://ci.appveyor.com/api/projects/status/romoyefuwopri84d/branch/master?svg=true
[AppVeyor]: https://ci.appveyor.com/project/raphinesse/cordova-plugin-exclude-files/branch/master
