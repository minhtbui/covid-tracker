import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { numFormat } from './ultilities';

function InfoBox({ title, todayCases, total }) {
   return (
      <Card className='infoBox'>
         <CardContent>
            <Typography className='inforBox__title' color='textSecondary'>
               {title}
            </Typography>

            <h3 className='infoBox__cases'>
               Today: {numFormat(todayCases, '0.0a')}
            </h3>

            <Typography className='inforBox__total' color='textSecondary'>
               Total: {numFormat(total, '0.0a')}
            </Typography>
         </CardContent>
      </Card>
   );
}

export default InfoBox;
