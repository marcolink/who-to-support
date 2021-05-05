who-to-support
=============

find the right projects to sponsor

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/who-to-support.svg)](https://npmjs.org/package/who-to-support)
[![Downloads/week](https://img.shields.io/npm/dw/who-to-support.svg)](https://npmjs.org/package/who-to-support)
[![License](https://img.shields.io/npm/l/who-to-support.svg)](https://github.com/marcolink/who-to-support/blob/master/package.json)

# Usage
```sh-session
npx who-to-support "user:marcolink" --token xxx
```

Alternatively, a `GH_TOKEN` env var will be used as token. 

## Filter 
Use [github qualifiers](https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-users#search-by-account-name-full-name-or-public-email) to filter results:

**Examples**
```sh-session
npx who-to-support "user:marcolink"
```
(`user` scoped)

```sh-session
npx who-to-support "org:facebook"
```
(`org` scoped)


# Example output:

```sh-session
npx who-to-support "user:marcolink"

  ✔ Initialized as Marco Link
  ✔ Found 9 repositories for query user:marcolink with 59 unique dependencies
  ✔ Found 58 github projects
  ✔ Received data for 30 dependencies

╔════════════════╤═════════════╤═════════════════════════════════╗
║     Owner      │ Occurrences │ User/Org                        ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║     Babel      │           2 │ https://github.com/babel        ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║    typicode    │           1 │ https://github.com/typicode     ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║  Daniel Bugl   │           1 │ https://github.com/omnidan      ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║ Sindre Sorhus  │           1 │ https://github.com/sindresorhus ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║     ESLint     │           1 │ https://github.com/eslint       ║
╟────────────────┼─────────────┼─────────────────────────────────╢
║ Gajus Kuizinas │           1 │ https://github.com/gajus        ║
╚════════════════╧═════════════╧═════════════════════════════════╝

You use 59 unique npm dependencies from 30 different creators.
You're currently sponsoring 0 creators of 6 who could be sponsored.

```
