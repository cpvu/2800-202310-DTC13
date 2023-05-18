const http = require('http');
const fs = require('fs');
const path = require('path');

let tableRows = [];

function generateTable() {
  let tableBody = '';
  for (const row of tableRows) {
    tableBody += '<tr>';
    tableBody += '<td>' + row.column1 + '</td>';
    tableBody += '<td>' + row.column2 + '</td>';
    tableBody += '<td>' + row.column3 + '</td>';
    tableBody += '<td><button onclick="deleteRow(this)">Delete</button></td>';
    tableBody += '</tr>';
  }

  return (
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>Dynamic Table</title>' +
    '</head>' +
    '<body>' +
    '<h1>Dynamically Generated Table</h1>' +
    '<form id="addForm" method="POST">' +
    '<input type="text" name="column1" placeholder="Column 1" required>' +
    '<input type="text" name="column2" placeholder="Column 2" required>' +
    '<input type="text" name="column3" placeholder="Column 3" required>' +
    '<button type="submit">Add Row</button>' +
    '</form>' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>Column 1</th>' +
    '<th>Column 2</th>' +
    '<th>Column 3</th>' +
    '<th></th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    tableBody +
    '</tbody>' +
    '</table>' +
    '<script>' +
    'function deleteRow(button) {' +
    'const row = button.parentNode.parentNode;' +
    'const rowIndex = row.rowIndex - 1;' +
    'row.remove();' +
    '}' +
    '</script>' +
    '</body>' +
    '</html>'
  );
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    const html = generateTable();
    res.end(html);
  } else if (req.url === '/' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const newRow = {
        column1: formData.get('column1'),
        column2: formData.get('column2'),
        column3: formData.get('column3')
      };
      tableRows.push(newRow);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});
