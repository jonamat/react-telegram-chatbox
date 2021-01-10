# react-library-boilerplate

Starting point for my React components monorepo libraries.\
It provides a bunch of configuration files and folders to speed up lib developing.\
Build script compile typescript source to tree-shakable esnext code with ES modules and ES5 code with commonJS modules, and generates its relative ts declaration file.\
It provides also support for testing with Jest, React Testing Library and React Test Renderer, coverage reports, eslint linting, prettier/editorConfig integration and DevOps with CirlceCL.

### Tools
- Typescript
- React
- ESLint
- Prettier
- Editor Config
- Jest
- CircleCL

## Installation

```cli
npm i **package name**
```

## Compatibility

--

## Features

--

## API

Index

[MyComponent](#MyComponent)

--

#### MyComponent

MyComponent description

```import { MyComponent } from 'react-library-boilerplate'```

| Prop      | Type      | Default | Description    |
| --------- | --------- | ------- | -------------- |
| `myProp`? | ReactNode | `world` | Something cool |

---

## Usage examples

A list of examples

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { MyComponent } from 'react-library-boilerplate'

ReactDOM.render(
    <MyComponent myProp="moon" />,
     document.getElementById('root')
)

```

## Dependencies

--

### Peer dependencies
- React: ^17.0.1
- ReactDOM: ^17.0.1

## License
MIT
