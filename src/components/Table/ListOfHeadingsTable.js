import React from 'react';
import './TableStyles.css';

const ListOfHeadingsTable = ({ tableTitle, tableData }) => {
  return (
    <table className="table-headings">
      <thead>
        <tr>
          <th colSpan={tableData[0].length} style={{ textAlign: 'center' }}>
            {tableTitle ? tableTitle : "List of Headings"}
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListOfHeadingsTable;