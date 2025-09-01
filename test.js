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
