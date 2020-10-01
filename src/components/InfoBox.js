import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { numFormat } from './ultilities';
import '../styles/InfoBox.scss';

function InfoBox({ isGreen, active, title, todayCases, total, ...props }) {
   return (
      <Card
         className={`infoBox ${active && 'infoBox--active'} ${
            isGreen && 'infoBox--isGreen'
         }`}
         onClick={props.onClick}>
         <CardContent>
            <Typography className='infoBox__title' color='textSecondary'>
               {title}
            </Typography>

            <Typography
               className={`infoBox__todayCases ${
                  isGreen && 'infoBox__todayCases--isGreen'
               }`}
               color='textSecondary'>
               Today: {numFormat(todayCases, '+0.0a')}
            </Typography>

            <Typography className='infoBox__total' color='textSecondary'>
               Total: {numFormat(total, '0.0a')}
            </Typography>
         </CardContent>
      </Card>
   );
}

export default InfoBox;
