import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { numFormat } from './ultilities';

function Graph({ casesType }) {
   const [data, setData] = useState({});

   useEffect(() => {
      const fetchData = async () => {
         await fetch(
            'https://disease.sh/v3/covid-19/historical/all?lastdays=90',
         )
            .then((res) => res.json())
            .then((data) => {
               const graphData = buildGraphData(data, casesType);
               setData(graphData);
            });
      };
      fetchData();
   }, [casesType]);

   const buildGraphData = (data, casesType) => {
      const graphData = [];
      let lastDataPoint;

      Object.keys(data[casesType]).forEach((date) => {
         if (lastDataPoint) {
            let newDataPoint = {
               x: date,
               //number cases between last date and new date
               y: data[casesType][date] - lastDataPoint,
            };
            graphData.push(newDataPoint);
         }
         lastDataPoint = data[casesType][date];
      });

      return graphData;
   };

   return (
      <div className='app__graph'>
         {data?.length > 0 && (
            <Line
               options={options}
               data={{
                  datasets: [
                     {
                        borderColor: '#CC1034',
                        data: data,
                     },
                  ],
               }}
            />
         )}
      </div>
   );
}

export default Graph;

const options = {
   legend: {
      display: false,
   },
   elements: {
      point: {
         radius: 0,
      },
   },
   maintainAspectRatio: false,
   tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
         label: function (tooltipItem, data) {
            return numFormat(tooltipItem.value, '+0,0');
         },
      },
   },
   scales: {
      xAxes: [
         {
            type: 'time',
            time: {
               format: 'MM/DD/YY',
               tooltipFormat: 'll',
            },
         },
      ],
      yAxes: [
         {
            gridLines: {
               display: false,
            },
            ticks: {
               // Include a dollar sign in the ticks
               callback: function (value, index, values) {
                  return numFormat(value, '0a');
               },
            },
         },
      ],
   },
};
