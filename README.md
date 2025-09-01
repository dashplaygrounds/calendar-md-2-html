# calendar-md-2-html

![Calendar Markdown to HTML Demo](image.png)

## About
```
Library that converts own parsed calendar markdown to html
Published to npm registry
```

## Import this in your application
```bash
pnpm add calendar-md-2-html
yarn add calendar-md-2-html
npm i calendar-md-2-html
```

## Usage 1
```js 
// test.js
const { markdownToTree, treeToCalendarHTMLTable, treeToHTML } = require('./index');
const fs = require('fs');
// const md = `
// # Root
// ## Child 1
// ### Grandchild 1
// ### Grandchild 2
// - Item 1
// - Item 2
// ## Child 2
// `;
const md = fs.readFileSync('./examples/sep-2025-calendar.md', 'utf8');

const tree = markdownToTree(md);
// const result = JSON.stringify(tree, null, 2);
// console.log(tree)
// console.log(tree['children']);
// console.log(tree['children'][4].children[0].children);

const htmlTable = treeToCalendarHTMLTable(tree);
console.log(htmlTable);

const html = treeToHTML(tree);
console.log(html);
```

## Usage 2
```ts
// app.ts

```