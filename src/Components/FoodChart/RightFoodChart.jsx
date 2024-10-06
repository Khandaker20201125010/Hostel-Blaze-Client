import  { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useLoaderData } from 'react-router-dom';

const RightFoodChart = () => {
    const meals = useLoaderData(); // Load meals data
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 390,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '30%',
                        background: 'transparent',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        offsetX: -8,
                        fontSize: '16px',
                        formatter: function(seriesName, opts) {
                            return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
                        },
                    },
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: [], // This will be set dynamically
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        }
    });

    useEffect(() => {
        if (meals) {
            // Count occurrences of each meal category
            const categoryCounts = meals.reduce((acc, meal) => {
                acc[meal.category] = (acc[meal.category] || 0) + 1;
                return acc;
            }, {});

            // Prepare data for the chart
            const categories = Object.keys(categoryCounts);
            const counts = Object.values(categoryCounts);

            setChartData(prevState => ({
                ...prevState,
                series: counts,
                options: {
                    ...prevState.options,
                    labels: categories,
                }
            }));
        }
    }, [meals]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={390} />
                <p className='text-center font-bold text-blue-500'>Total Food</p>
            </div>
            
            
        </div>
    );
};

export default RightFoodChart;
