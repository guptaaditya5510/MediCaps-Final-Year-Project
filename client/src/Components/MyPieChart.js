import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyPieChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const positive = data.filter((item) => item.score > 0);
        const negative = data.filter((item) => item.score < 0);
        const neutral = data.filter((item) => item.score === 0);
        const myChartRef = chartRef.current.getContext('2d');

        const myChart=new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: data.map(obj => obj.sender),
                datasets: [
                    {
                        label: 'Values',
                        data: [positive.length, negative.length, neutral.length],
                        backgroundColor: ['green', 'red', 'yellow'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        return () => {
            // Clean up the chart instance when the component unmounts
            myChart.destroy();
        };
    }, [data]);

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
};

export default MyPieChart;
