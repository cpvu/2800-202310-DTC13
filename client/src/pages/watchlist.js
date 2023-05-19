
// // import { useSession, getSession } from "next-auth/react"
// // import { Router, useRouter } from "next/router";

// // export default function SearchCoin() {
// //     const router = useRouter()
// //     const { data: session } = useSession()
// //     return (
// //         <>
// //         {session ? <> <h1>Welcome User!</h1>
// //         <p>Insert a coin to your Record!</p>
// //         <input type="input" id="record_value"></input>
// //         <h1>{session.user.name}</h1>   </>: <h1>Sign up or login to get access!</h1>}
// //         </>
// //     )
// // }

// const usersModel = require('./server/src/models/authSchema');

const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');


// replace
let tableRows = [
    { record: 'A' },
    { record: 'B' }
  ];

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    tableRows = JSON.parse(data);
  }
}

function saveData() {
  const data = JSON.stringify(tableRows);
  fs.writeFileSync(DATA_FILE, data, 'utf8');
}

function generateTable() {
  let tableBody = '';
  for (const [index, row] of tableRows.entries()) {
    tableBody += '<tr>';
    tableBody += '<td>' + row.record + '</td>';
    tableBody +=
      '<td><button onclick="deleteRow(' + index + ')">Delete</button></td>';
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
    '<input type="text" name="record" placeholder="Record" required>' +
    '<button type="submit">Add Row</button>' +
    '</form>' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>Record</th>' +
    '<th></th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    tableBody +
    '</tbody>' +
    '</table>' +
    '<script>' +
    'function deleteRow(index) {' +
    '  fetch("/", { method: "DELETE", body: JSON.stringify({ index }) })' +
    '    .then(function () {' +
    '      location.reload();' +
    '    });' +
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
    loadData();
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
        record: formData.get('record'),
      };
      tableRows.push(newRow);
      saveData();
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  } else if (req.url === '/' && req.method === 'DELETE') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { index } = JSON.parse(body);
      if (index >= 0 && index < tableRows.length) {
        tableRows.splice(index, 1);
        saveData();
        res.statusCode = 200;
      } else {
        res.statusCode = 400;
      }
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
