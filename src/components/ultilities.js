import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
   cases: {
      hex: '#CC1034',
      multiplier: 800,
   },
   recovered: {
      hex: '#7dd71d',
      multiplier: 1200,
   },
   deaths: {
      hex: '#fb4443',
      multiplier: 2000,
   },
};

export const sortData = (data) => {
   const sortedData = [...data];

   return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const numFormat = (number, format = '0,0') =>
   numeral(number).format(format);

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') =>
   data.map((country) => (
      <Circle
         center={[country.countryInfo.lat, country.countryInfo.long]}
         fillOpacity={0.4}
         color={casesTypeColors[casesType].hex}
         fillColor={casesTypeColors[casesType].hex}
         radius={
            Math.sqrt(country[casesType]) *
            casesTypeColors[casesType].multiplier
         }>
         <Popup>
            <div className='popupMap__container'>
               <div className='popupMap__country'>
                  <img src={country.countryInfo.flag} alt='flag' />
                  {country.country}
               </div>
               <div className='popupMap__cases'>
                  Cases: {numFormat(country.cases)}
               </div>
               <div className='popupMap__recovered'>
                  Recovered: {numFormat(country.recovered)}
               </div>
               <div className='popupMap__death'>
                  Deaths: {numFormat(country.deaths)}
               </div>
            </div>
         </Popup>
      </Circle>
   ));
