import { useSession, getSession } from "next-auth/react"
import { Router, useRouter } from "next/router";
const express = require('express');
const app = express();
const session = require('express-session')
const usersModel = require('./server/src/models/authScema');

export default function addRecord() {
    const router = useRouter()
    const { data: session } = useSession()
    return (
        <>
        {session ? <> <h1>Welcome</h1>
        <p>Add a coin to your records!</p>
        <input type="input"></input>
        <h1>{session.user.name}</h1>   </>: <h1>Sign up or login to get access!</h1>}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session: session,
      },
    };
  }


const http = require('http');
const fs = require('fs');
const path = require('path');

let tableRows = [];

export default function generateTable() {
  let tableBody = '';
  for (const row of tableRows) {
    tableBody += '<tr>';
    tableBody += '<td>' + row.column1 + '</td>';
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
    '<button type="submit">Add Row</button>' +
    '</form>' +
    '<table>' +
    '<thead>' +
    '<tr>' +
    '<th>Column 1</th>' +
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

app.use(express.urlencoded({ extended: false }))


app.get('/watchlist', async (req, res) => {
    const result = await usersModel.findOne( { username: req.session.username })
    records = result.records
    let watchlist = ` <form action="/addRecord" method="POST">
    <label for="x"> Add new item</label>
    <input type="text" value="item name goes here" id="x" placeholder="item name">
    <input type="submit" value="Add">
</form>`

    records.forEach(function(record)  {
        watchlist += ` <li>
        <ul>
            <li>
                ${record.record}
            </li>
            <li>
                <form action="deleteRecord" method="POST">
                    <input type="hidden" value="">
                    <input type="submit" value="Delete">
                </form>
            </li>
        </ul>
    </li>`
    })
    res.render(watchlist)
})


app.post('/addRecord', async (req, res) => {
    const updateResult = await usersModel.updateOne({ username: req.session.username }, { $push: { records: { "record": req.body.theLabelOfThenNewItem } } })
    console.log(updateResult);
    res.redirect('/watchlist');
})


app.post('/deleteRecord', async (req, res) => {
    try {
        const result = await usersModel.findOne({ username: req.session.username })
        const newArr = result.todos.filter(todoItem =>
            todoItem.name != req.body.x
        )
        const updateResult = await usersModel.updateOne({ username: req.session.username }, { $set: { todos: newArr } })
        res.redirect('/watchlist');
    }
    catch (error) {
        console.log(error);
    }
})
