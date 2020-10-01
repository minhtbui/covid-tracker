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
import 'leaflet/dist/leaflet.css';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import { sortData } from './components/ultilities';
import Graph from './components/Graph';
import Map from './components/Map';

function App() {
   const [countries, setCountries] = useState([]);
   const [countryCode, setCountryCode] = useState('worldwide');
   const [country, setCountry] = useState({});
   const [tableData, setTableData] = useState([]);
   const [mapCenter, setMapCenter] = useState([0, 0]);
   const [mapZoom, setMapZoom] = useState(2);
   const [mapCountries, setMapCountries] = useState([]);
   const [casesType, setCasesType] = useState('cases');

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
               setMapCountries(data);
            });
      };
      getCountriesApi();
   }, []);

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

            countryCode === 'worldwide'
               ? setMapCenter([0, 0])
               : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setTimeout(
               () =>
                  countryCode === 'worldwide' ? setMapZoom(2) : setMapZoom(5),
               500,
            );
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
                     {countries.map((country, i) => (
                        <MenuItem key={i} value={country.value}>
                           {country.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>

            <div className='app__stats'>
               <InfoBox
                  active={casesType === 'cases'}
                  title='Coronavirus Cases'
                  todayCases={country.todayCases}
                  total={country.cases}
                  onClick={(e) => setCasesType('cases')}
               />
               <InfoBox
                  isGreen
                  active={casesType === 'recovered'}
                  title='Recovered Cases'
                  todayCases={country.todayRecovered}
                  total={country.recovered}
                  onClick={(e) => setCasesType('recovered')}
               />
               <InfoBox
                  active={casesType === 'deaths'}
                  title='Death Cases'
                  todayCases={country.todayDeaths}
                  total={country.deaths}
                  onClick={(e) => setCasesType('deaths')}
               />
            </div>
            {/* MAP */}
            <Map
               casesType={casesType}
               countries={mapCountries}
               center={mapCenter}
               zoom={mapZoom}
            />
         </div>

         <Card className='app__right'>
            <CardContent>
               {/* Country LIST */}
               <h3>Live Cases by country</h3>
               <Table countries={tableData} />

               {/* Line Chart */}
               <h3>Worldwide new {casesType}</h3>
               <Graph casesType={casesType} />
            </CardContent>
         </Card>
      </div>
   );
}

export default App;
