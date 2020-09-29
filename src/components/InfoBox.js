import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function InfoBox({ title, todayCases, total }) {
   return (
      <Card className='infoBox'>
         <CardContent>
            <Typography className='inforBox__title' color='textSecondary'>
               {title}
            </Typography>

            <h3 className='infoBox__cases'>Today: {todayCases} cases</h3>

            <Typography className='inforBox__total' color='textSecondary'>
               Total: {total} cases
            </Typography>
         </CardContent>
      </Card>
   );
}

export default InfoBox;
