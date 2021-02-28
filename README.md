<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Zustand-Yjs](#zustand-yjs)
  - [Getting started](#getting-started)
  - [API](#api)
    - [`useYDoc(guid: string, connect: (doc: Y.Doc) => () => void)`](#useydocguid-string-connect-doc-ydoc----void)
    - [`useYArray(doc: Y.Array)`](#useyarraydoc-yarray)
    - [`useYMap(doc: Y.Array)`](#useymapdoc-yarray)
  - [Run the example](#run-the-example)
  - [Special Thanks](#special-thanks)
  - [Roadmap](#roadmap)
  - [License](#license)
  - [Contribution](#contribution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# React Jitsi Hooks

> Disclaimer: This is a work in progress. Do not use this library in production,
> breaking change will happens before arriving to the first stable version.

Hooks and stores for lib-jitsi-meet low API level.

## Getting started

Install dependancy `@lyno/lib-jitsi-meet` and `zustand`

```
yarn add @lyno/lib-jitsi-meet zustand
```

## Special Thanks

- [Facilita.social](https://facilita.social) – For supporting the project
- [Zustand](https://github.com/pmndrs/zustand) – A small, fast and scaleable bearbones state-management solution. Our build system is taken from there.

## Roadmap

1. Online demo
2. Add test
3. Support sub-documents (`useYSubDoc`?)
4. Add hooks for YXMLFragment

## License

See the [CONTRIBUTE](CONTRIBUTE.md) file for contribution guidelines

## Contribution

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
