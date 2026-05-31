import React, { useState, useRef } from 'react';

const App = () => {
  // 1. Initial State matching the data in the video exactly
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Ram', age: 25 },
    { id: 2, name: 'Shyam', age: 30 },
    { id: 3, name: 'Ali', age: 35 },
    { id: 4, name: 'Shaw', age: 20 },
    { id: 5, name: 'Tavneet', age: 50 },
    { id: 6, name: 'Lakshmi', age: 40 },
  ]);

  // 2. useRef to silently track the IDs of edited rows without triggering re-renders
  // We use a Set so that if a user edits the same row twice, the ID doesn't get duplicated.
  const editedRowsRef = useRef(new Set());

  // 3. Function to handle input changes
  const handleInputChange = (id, field, value) => {
    // Add the id of the edited row to our ref
    editedRowsRef.current.add(id);

    // Update the state so the user sees their typing
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // 4. Function to log the results on Save
  const handleSave = () => {
    // Convert the Set back to an array and log it exactly like the video
    console.log("Edited rows: ", Array.from(editedRowsRef.current));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Track edited cells to log updates for future</h2>
      
      <table border="1" style={{ borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th style={{ padding: '5px 10px' }}>ID</th>
            <th style={{ padding: '5px 10px' }}>Name</th>
            <th style={{ padding: '5px 10px' }}>Age</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              
              <td style={{ padding: '5px 10px' }}>{row.id}</td>
              
              <td style={{ padding: '5px 10px' }}>
                {/* REQUIRED: type="text" */}
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
                  style={{ border: '1px solid #ccc', outline: 'none' }}
                />
              </td>
              
              <td style={{ padding: '5px 10px' }}>
                {/* REQUIRED: type="number" */}
                <input
                  type="number"
                  value={row.age}
                  onChange={(e) => handleInputChange(row.id, 'age', Number(e.target.value))}
                  style={{ border: '1px solid #ccc', outline: 'none' }}
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSave}>Save changes</button>
      
    </div>
  );
};

export default App;