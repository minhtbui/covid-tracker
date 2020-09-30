import React from 'react';
import '../styles/Table.scss';
import { numFormat } from './ultilities';

function Table({ countries }) {
   return (
      <div className='table'>
         <tr>
            <th>Country</th>
            <th>Cases</th>
         </tr>
         {countries.map(({ country, cases, countryInfo }) => (
            <tr className='table__data'>
               <td>
                  <img src={countryInfo.flag} alt='flag' />
                  {country}
               </td>
               <td>
                  <strong>{numFormat(cases)}</strong>
               </td>
            </tr>
         ))}
      </div>
   );
}

export default Table;
