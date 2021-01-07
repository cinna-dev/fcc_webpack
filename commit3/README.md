# Webpack

## Source

<https://www.youtube.com/watch?v=MpGLUVbqoYQ&ab_channel=freeCodeCamp.org>

## Installation

### Initialize npm

```bash
npm init
```

> package.json can be set to `private` to prevents being published on `npm`
>
> ```json
> "private": true,
> ```

### Install webpack and webpack-cli

> cli = Command-Line Interface
> <https://webpack.js.org/api/cli/>

```bash
npm i -D webpack webpack-cli
```

### Initialize Script

```json
  "scripts": {
    "start": "webpack"
  },
```

## Usage

- create a `index.js` in `src`.

- use Modules. Either `commonjs` or `ES6 Modules`.

- `index.js` will be the window into our application code.

## Default Behaviour

- Webpack will search for a `index.js` inside the `src` folder and output the **bundled** code to the `dist` folder.

- Webpack will automatically minify the code:

  - putting all the code in one line.

  - switching variable names with shortened ones.
