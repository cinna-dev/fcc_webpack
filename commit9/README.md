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

## Loaders

<https://webpack.js.org/loaders/>

- add a **Loader** by creating a  **module** object with a `rules` porperty.

```js
module.exports = {
  output: {
    filename: "hello.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rule: []
  }
}
```

- `rules` is an **Array** of **Objects**.

- create the rules for `css` files by adding an **Object** containing `test` and `use`

### CSS Loader

```bash
npm i -D css-loader style-loader
```

```js
  module: {
    rule: [
      {
        test: /\.css$\
        use:["css-loader"]
      }
    ]
  }
```

  - `test` is a **Regular Expression** testing for `css` files that are **imported** anywhere inside our `js` structure.

  - `use` is an **Array** containing the name of the **Loader** to use.

> the `style-sheet` has to be imported inside a `js` file.

  - `css-loader` takes our `css` and translates it into `js` but doesn't inject the script into the `DOM`.

- to do this we need the `style-loader`!

- add `style-loader` to the `use` array.

```js
  module: {
    rule: [
      {
        test: /\.css$\
        use:["style-loader", "css-loader"]
      }
    ]
  }
```

> the Order of the **Loaders** are reversed. So `style-loader` comes first even though the `css-loader` has to translate the `css` first.

### SCSS Loader

```bash
npm i -D sass-loader node-sass
```

```js
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        "style-loader", // 3.Inject styles into DOM
        "css-loader", // 2. Turns css into commonjs
        "sass-loader" // 1. Turns sass into css aka scss compiler
      ]
    }]
  }
```

> `sass-loader` also depends on either `node-sass` or `dart-sass`. So make sure to install one of these allways together with the `sass.loader`!

## Cache Busting

> Browser will automatically `cache` files when there `naming` after loading or reloading stays same.
> Te prevent this there is something called a `Content hash` which is determined by the **Content** of the file. If the **Content** doesn't change the `Content Hash` stays the same.

- insert `[contenthash]` after the **output:filename** name and **file extension**.

```js
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  }
```

*hash by md5?*

- the output file will now look something like this: `main.b350185350cfbb477677.js`.
but the import in the `html` still says `main.js`.
which brings us to...

## Plugins

<https://webpack.js.org/plugins/>

```bash
npm i -D html-webpack-plugin
```

- import the **plugin**

- create a `plugins` property that is an **Array** of **Plugins**.

```js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [new HtmlWebpackPlugin()],
```

### Template

- create a `template` for the `HtmlWebpackPlugin`.

- in `src` create a `template.html`.

- this file will contain all the content of `index.html` except the `<script>` for `js` and `<meta>` for `device-width`.

- insert an **Object** into the plugin constructor that contains the template path

```js
  plugins: [new HtmlWebpackPlugin({
    template: "./src/template.html"
  })],
```

- no need for the `index.html` any more.

## Splitting Dev & Production

- Create a `webpack.dev.js` and `webpack.prod.js` and `webpack.common.js`in the `root` folder.

  - `dev` and `prod` will share from `common`.

- install **webpack-merge**.

```bash
npm i -D webpack-merge
```

- now we can *require* and *merge* webpack files.

```bash
const path = require("path");
const common = require("./webpack.common"); 
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
});
```

*example: importing `common` into `dev`.*

- define a `start` script for the webpack.dev and `build` script for webpack.prod in the `package.json`.

```json
  "scripts": {
    "start": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```

### Dev Server

- the cli command `webpack serve` opens up a live server.

```json
  "scripts": {
    "start": "webpack serve --config webpack.dev.js --open",
    "build": "webpack --config webpack.prod.js"
  },
```

> `serve` will run the project from memory not from the `dist` folder.
