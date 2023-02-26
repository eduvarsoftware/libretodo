# [LibreTODO](https://libretodo.com)

A minimal, no-frills TODO board. Free and open source software under the [3-clause BSD license](https://opensource.org/license/bsd-3-clause/). Inspired by [tjmolinski's crushr](https://github.com/tjmolinski/crushr).

Deployed at [libretodo.com](https://libretodo.com). LibreTODO uses the PostgreSQL-Express-React-Node stack. Also uses [serverless-http](https://www.npmjs.com/package/serverless-http) and [Serverless Framework](https://npmjs.com/package/serverless) for deployment as a serverless function.

## Roadmap

- Deployable Docker image for both client+server and server-only configurations
- React Native mobile version
- Mobile widget
- Publishing to F-Droid and (maybe) Google Play

## Long term goals

- Full Typescript migration
- Native Linux version with either C++/Qt or Rust/gtk-rs
- Explore Electron.js
- Explore native Windows version
- Explore native MacOS version

## Why no Redux?

We are intentionally trying to avoid using frontend libraries as much as possible to reduce bloat. We want to what performance impact this has on our code, and learn more about what libraries actually do in the process. Of course if state management gets too complex, then we'll turn to Redux for sure. But for a simple app like LibreTODO, I don't think that's likely.
