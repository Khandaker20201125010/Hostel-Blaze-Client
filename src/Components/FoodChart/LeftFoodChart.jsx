import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLoaderData } from 'react-router-dom';

const LeftFoodChart = () => {
    const meals = useLoaderData(); // Fetch meals data
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Rating',
            data: [] // Initialize with empty data
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: [], // Initialize with empty categories
                position: 'down',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: true,
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            title: {
                text: 'Monthly Meal Ratings',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        }
    });

    useEffect(() => {
        if (meals) {
            const titles = meals.map(meal => meal.title); // Get meal titles
            const ratings = meals.map(meal => meal.rating); // Get meal ratings

            setChartData(prevState => ({
                series: [{
                    name: 'Rating',
                    data: ratings // Set ratings for the series data
                }],
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories: titles // Set titles for x-axis
                    }
                }
            }));
        }
    }, [meals]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default LeftFoodChart;
