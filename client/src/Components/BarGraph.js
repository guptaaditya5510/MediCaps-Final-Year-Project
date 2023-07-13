import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import isEqual from 'lodash/isEqual';

const BarGraph = ({ data }) => {
    console.log(data);
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    const myChart = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: data.map(obj => obj.sender),
        datasets: [
          {
            label: "BarGraph",
            data: data.map(obj => obj.score),
            backgroundColor: data.map(obj => obj.score === 0 ? 'yellow' : obj.score > 0 ? '#1B9C85' : 'red'),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    return () => {
      // Clean up the chart instance when the component unmounts
      myChart.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas id="bar-chart" ref={chartRef} className="w-[500px] h-[60vh]"/>
    </div>
  );
};

export default BarGraph;
