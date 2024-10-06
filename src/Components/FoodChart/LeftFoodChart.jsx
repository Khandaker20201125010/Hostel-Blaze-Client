import  { useEffect, useState } from 'react';
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
                height: 450,
                type: 'bar',
                toolbar: {
                    show: false // Disable the chart toolbar
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 2,
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
                offsetY: -25,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: [], // Initialize with empty categories
                position: 'bottom', // Adjusts the position of the x-axis labels
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: true,
                },
                labels: {
                    rotate: -26, // Rotate labels for better visibility
                    style: {
                        fontSize: '10px', // Adjust font size for better readability
                        colors: ['#000'],
                        fontWeight: 'bold', // Set the color of the food names
                    }
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
            <div id="chart sm:w-full">
                <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={400} />
                <p className='text-center font-bold text-blue-500'>Monthly Meal Ratings</p>
            </div>
        </div>
    );
};

export default LeftFoodChart;
