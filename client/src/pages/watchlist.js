import { useSession, getSession } from "next-auth/react";
import { Navbar, SignUpForm } from "@/components";
import { Box } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AddRecord() {
  const router = useRouter();
  const { data: session } = useSession();
    console.log('session', session)
  return (
    <>
      {session ? (
        <>
          <h1>Welcome {session.user.name}!</h1>
          <p>Add a coin to your record!</p>
          <MyComponent />
        </>
      ) : (
        <h1>Sign up or log in to get access!</h1>
      )}
      
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}

function MyComponent() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const savedRecordsString = localStorage.getItem("tableRows");
    if (savedRecordsString) {
      const savedRecordsArray = JSON.parse(savedRecordsString);
      setTableRows(savedRecordsArray);
    }
  }, []);

  const addRecord = (event) => {
    event.preventDefault();

    const form = event.target;
    const recordInput = form.elements.record;

    const newRecord = {
      record: recordInput.value,
    };

    setTableRows((prevRows) => [...prevRows, newRecord]);
    localStorage.setItem(
      "tableRows",
      JSON.stringify([...tableRows, newRecord])
    );

    form.reset();
  };

  const deleteRow = (index) => {
    const updatedTableRows = [...tableRows];
    updatedTableRows.splice(index, 1);
    setTableRows(updatedTableRows);
    localStorage.setItem("tableRows", JSON.stringify(updatedTableRows));
  };

  const tableBody = tableRows.map((row, index) => (
    <tr key={index}>
      <td>{row.record}</td>
      <td>
        <button onClick={() => deleteRow(index)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <title>CryptoCurrency Records</title>
      <h1>Record Table</h1>
      <form id="addForm" onSubmit={addRecord}>
        <input type="text" name="record" placeholder="Record" required />
        <button type="submit">Add Record</button>
      </form>
      <table>
        <tbody>{tableBody}</tbody>
      </table>
    </>
  );
}