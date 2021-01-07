# Webpack

## Source

**Youtube**
<https://www.youtube.com/watch?v=MpGLUVbqoYQ&ab_channel=freeCodeCamp.org>

**Official Documentation**
<https://webpack.js.org/concepts/>

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

- If there is no Config, Webpack will search for a `index.js` inside the `src` folder and output the **bundled** code to the `dist` folder as `main.js`.

- Webpack will automatically minify the code:

  - putting all the code in one line.

  - switching variable names with shortened ones.

## Config File

- create a Config file in `root` called `webpack.config.js`.

- the Config will be exported as a module

```js
module.exports = {

};
```

- defining entry file and output file.

```js
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "hello.js",
    path: "/someAbsolutePath/dist"
  }
};
```

- use node.js to give a dynamic path

```js
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "hello.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

- add config to the webpack script.

```json
  "scripts": {
    "start": "webpack --config webpack.config.js"
  },
```

### Development Mode

- enter development mode in the 'webpack.config.js`.

```js
module.exports = {
  mode: "development",
  entry: "./src/index.js",
```

- it will stop webpack from **minifying** the script.

- by default the **development mode** is using **eval** which makes the code hard to read. 

- set `devtool` form `eval` to ~~`none`~~ `false` will solve that

```js
module.exports = {
  mode: "development",
  devtool:false,
```
