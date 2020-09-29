import {
   Card,
   CardContent,
   FormControl,
   MenuItem,
   Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/responsive.scss';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import { sortData } from './components/ultilities';

function App() {
   const [countries, setCountries] = useState([]);
   const [countryCode, setCountryCode] = useState('worldwide');
   const [country, setCountry] = useState({});
   const [tableData, setTableData] = useState([]);

   useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
         .then((res) => res.json())
         .then((data) => {
            setCountry(data);
         });
   }, []);

   useEffect(() => {
      const getCountriesApi = async () => {
         await fetch('https://disease.sh/v3/covid-19/countries')
            .then((res) => res.json())
            .then((data) => {
               const countries = data.map((country) => ({
                  name: country.country, //United State, United Kingdom, Vietnam
                  value: country.countryInfo.iso2, // US, UK, VN
               }));

               const sortedData = sortData(data);
               setCountries(countries);
               setTableData(sortedData);
            });
      };
      getCountriesApi();
   }, [countries]);

   const onCountryChange = async (e) => {
      const countryCode = e.target.value;
      // Api Url
      const url =
         countryCode === 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      // fetching Api data to json => set data into state
      await fetch(url)
         .then((res) => res.json())
         .then((data) => {
            setCountryCode(countryCode);
            setCountry(data);
         });
   };
   return (
      <div className='app'>
         <div className='app__left'>
            <div className='app__header'>
               <h1>Covid Tracker</h1>
               <FormControl className='app__dropdown'>
                  <Select
                     variant='outlined'
                     onChange={onCountryChange}
                     value={countryCode}>
                     <MenuItem value='worldwide'>Worldwide</MenuItem>
                     {countries.map((country) => (
                        <MenuItem value={country.value}>
                           {country.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>

            <div className='app__stats'>
               <InfoBox
                  title='Coronavirus Cases'
                  todayCases={country.todayCases}
                  total={country.cases}
               />
               <InfoBox
                  title='Recovered'
                  todayCases={country.todayRecovered}
                  total={country.recovered}
               />
               <InfoBox
                  title='Death'
                  todayCases={country.todayDeaths}
                  total={country.deaths}
               />
            </div>
            {/* MAP */}
         </div>

         <div className='app__right'>
            <Card>
               <CardContent>
                  {/* Country LIST */}
                  <h3>Live Cases by country</h3>
                  <Table countries={tableData} />

                  {/* Line Chart */}
                  <h3>Worldwide new cases</h3>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

export default App;
