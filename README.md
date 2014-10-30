# React-gist-embed

A simple react component to dynamically render a gist embed

## Introduction

Gists are difficult to render dynamically because they use `document.write`.

This component offers a simple workaround, allowing a React app to render a
gist in an iframe and then adjust the height of the iframe to reflect the height
of the child gist itself.

## Getting started

Install via npm:

```bash
npm install --save react-gist-embed
```

Then simply require and pass a gistId.

```js
var GistEmbed = require('react-gist-embed');

<GistEmbed gistId='a759fd68208808020598'/>
```
