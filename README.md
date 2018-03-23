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

<platform name="android">
    <exclude-files pattern="ios-only" />
</platform>
```

Patterns are [globs](https://github.com/isaacs/node-glob#glob-primer) that are resolved relative to the `www` directory.
Platform specific excludes are appended to the global excludes.


## How it works

Files that match the given patterns will be removed by an `after_prepare` hook.
This seems to be the only safe method of doing this at the moment of writing.

This means that cordova will first copy *everything* from `www` to the platform directories and then the files matched by this plugin will be deleted from there.
Consequently, you *cannot* speed up `cordova prepare` by excluding files using this plugin.


## Compatibility

Tested with `cordova@6.5.0`. Requires node 6. For node 4 support use `cordova-plugin-exclude-files@^0.2.4`.

## License

`cordova-plugin-exclude-files` is licensed under the MIT License.

Copyright (c) 2017 Raphael von der Grün
