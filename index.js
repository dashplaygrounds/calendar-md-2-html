function markdownToTree(markdown) {
  const lines = markdown.trim().split('\n');
  const stack = [];
  let root = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('#')) {
      const match = line.match(/^(#+)\s+(.*)$/);
      if (!match) continue;

      const level = match[1].length;
      const name = match[2].trim();
      const node = { name, children: [] };

      // Pop until we find a parent of lower level
      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        root = node;
      } else {
        const parent = stack[stack.length - 1].node;
        parent.children.push(node);
      }

      stack.push({ level, node });

    } else if (line.startsWith('- ')) {
      const name = line.slice(2).trim();
      const node = { name, children: [] };

      if (stack.length === 0) continue; // Invalid structure

      const parent = stack[stack.length - 1].node;
      parent.children.push(node);
    }
  }

  return root;
}


function treeToCalendarHTMLTable(tree) {
  if (!tree) return '';

  const weeks = tree.children || [];

  const WeekdayByName = Object.freeze({
    SUNDAY: 'Sun',
    MONDAY: 'Mon',
    TUESDAY: 'Tue',
    WEDNESDAY: 'Wed',
    THURSDAY: 'Thu',
    FRIDAY: 'Fri',
    SATURDAY: 'Sat'
  });

  let html = '<table class="calendar">';
  html += `
      <thead>
        <tr>
          <th>${WeekdayByName.SUNDAY}</th>
          <th>${WeekdayByName.MONDAY}</th>
          <th>${WeekdayByName.TUESDAY}</th>
          <th>${WeekdayByName.WEDNESDAY}</th>
          <th>${WeekdayByName.THURSDAY}</th>
          <th>${WeekdayByName.FRIDAY}</th>
          <th>${WeekdayByName.SATURDAY}</th>
        </tr>
      </thead>
  `;
  html += '<tbody>';

  for (const week of weeks) {
    html += '<tr>';
    console.log(week.children)
    for (let i = 0; i < week.children.length; i++) {
      html += `
        <td class="node-name">
          <div>
           ${week.children[i].name.slice(-2)}<br />
        `
      for (let item of week.children[i].children) {
        html += `
            ${item.name}<br />
          `;
      }
      html += `
          </div>
        </td>`;
    }
    // Fill remaining days with empty cells if less than 7
    for (let i = week.children.length; i < 7; i++) {
      html += '<td></td>';
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  return html;
}

function treeToHTML(tree) {
  if (!tree) return '';

  let html = `<div class="node"><span class="node-name">${tree.name}</span>`;

  if (tree.children && tree.children.length > 0) {
    html += '<div class="children">';
    for (const child of tree.children) {
      html += treeToHTML(child);
    }
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// Export it for use
module.exports = { markdownToTree, treeToCalendarHTMLTable, treeToHTML };