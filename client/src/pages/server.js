const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/record-table', { useNewUrlParser: true, useUnifiedTopology: true });

const Record = mongoose.model('Record', { record: String });

const app = express();
app.use(express.json());

app.get('/api/records', async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

app.post('/api/records', async (req, res) => {
  const { record } = req.body;
  const newRecord = new Record({ record });
  await newRecord.save();
  res.status(201).json(newRecord);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


// function startServer() {
//     const server = http.createServer((req, res) => {
//         if (req.url === '/' && req.method === 'GET') {
//             res.setHeader('Content-Type', 'text/html');
//             res.statusCode = 200;
//             const html = MyComponent();
//             res.end(html);
//         } else if (req.url === '/' && req.method === 'POST') {
//             let body = '';
//             req.on('data', (chunk) => {
//                 body += chunk.toString();
//             });
//             req.on('end', () => {
//                 const formData = new URLSearchParams(body);
//                 const newRow = {
//                     record: formData.get('record'),
//                 };
//                 tableRows.push(newRow);


//                 res.statusCode = 302;
//                 res.setHeader('Location', '/');
//                 res.end();
//             });
//         } else if (req.url === '/' && req.method === 'DELETE') {
//             let body = '';
//             req.on('data', (chunk) => {
//                 body += chunk.toString();
//             });
//             req.on('end', () => {
//                 const { index } = JSON.parse(body);
//                 if (index >= 0 && index < tableRows.length) {
//                     tableRows.splice(index, 1);

//                     res.statusCode = 200;
//                 } else {
//                     res.statusCode = 400;
//                 }
//                 res.end();
//             });
//         } else {
//             res.statusCode = 404;
//             res.end('Not Found');
//         }
//     });
//     return server
// }




// import React, { useState, useEffect } from 'react';
// import { useSession, getSession } from 'next-auth/react';
// import { Navbar, SignUpForm } from '@/components';
// import { Box } from '@chakra-ui/react';
// import { useBreakpointValue } from '@chakra-ui/react';
// import { Router, useRouter } from 'next/router';
// import http from 'http';

// const path = require('path');

// export default function AddRecord() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [records, setRecords] = useState([{ record: '1' }, { record: 'B' }]);

//   useEffect(() => {
//     const savedRecordsString = localStorage.getItem('savedRecords');
//     if (savedRecordsString) {
//       const savedRecordsArray = JSON.parse(savedRecordsString);
//       setRecords(savedRecordsArray);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('savedRecords', JSON.stringify(records));
//   }, [records]);

//   const handleAddRecord = (event) => {
//     event.preventDefault();

//     const form = event.target;
//     const recordInput = form.elements.record;

//     const newRecord = {
//       record: recordInput.value,
//     };

//     setRecords([...records, newRecord]);

//     form.reset();
//   };

//   const handleDeleteRow = (index) => {
//     const updatedRecords = [...records];
//     updatedRecords.splice(index, 1);
//     setRecords(updatedRecords);
//   };

//   return (
//     <>
//       {session ? (
//         <>
//           <h1>Welcome {session.user.name}!</h1>
//           <p>Add a coin to your record!</p>
//         </>
//       ) : (
//         <h1>Sign up or log in to get access!</h1>
//       )}
//       <MyComponent
//         records={records}
//         handleAddRecord={handleAddRecord}
//         handleDeleteRow={handleDeleteRow}
//       />
//     </>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   return {
//     props: {
//       session: session,
//     },
//   };
// }

// function MyComponent({ records, handleAddRecord, handleDeleteRow }) {
//   const tableBody = records.map((row, index) => (
//     <tr key={index}>
//       <td>{row.record}</td>
//       <td>
//         <button onClick={() => handleDeleteRow(index)}>Delete</button>
//       </td>
//     </tr>
//   ));

//   return (
//     <>
//       <title>CryptoCurrency Records</title>
//       <h1>Record Table</h1>
//       <form id="addForm" onSubmit={handleAddRecord}>
//         <input type="text" name="record" placeholder="Record" required />
//         <button type="submit">Add Record</button>
//       </form>
//       <table>
//         <tbody>{tableBody}</tbody>
//       </table>
//     </>
//   );
// }
