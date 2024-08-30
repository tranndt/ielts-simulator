import React from 'react';
import './HeadingsTable.css';

const HeadingsTable = ({ data }) => {
  return (
    <table className="table-headings">
      <thead>
        <tr>
          <th colSpan={data[0].length} style={{ textAlign: 'center' }}>
            List of Headings
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
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

export default HeadingsTable;