# TVersion

npm version-like commands for all

## Description

We all know how powerful is to do [semver](https://semver.org/) versioning using npm and its commands like `npm version`, `npm version major`, `npm version minor`,  `npm version patch`.

The problem is that outside of the JavaScript world, we lose our powers. With TVersion, you'll be able to use npm-like commands on any git repository you want.

## Install

```
$ git clone git@github.com:matheusrabelo/tversion.git
$ cd tversion
$ npm link
```
ps: you might need sudo to run `npm link`

## Usage

```
$ cd anyrepository
$ tversion # will print out the current version
$ tversion minor # will generate a minor release tag
```

## License
MIT
