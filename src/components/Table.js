import React from 'react';
import '../styles/Table.scss';

function Table({ countries }) {
   return (
      <div className='table'>
         <tr>
            <th>Country</th>
            <th>Cases</th>
         </tr>
         {countries.map(({ country, cases }) => (
            <tr className='table__data'>
               <td>{country}</td>
               <td>
                  <strong>{cases}</strong>
               </td>
            </tr>
         ))}
      </div>
   );
}

export default Table;
