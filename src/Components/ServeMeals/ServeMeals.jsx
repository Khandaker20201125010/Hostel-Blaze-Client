import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServeMeals = () => {
    const [requestedMeals, setRequestedMeals] = useState([]);

    useEffect(() => {
        const fetchRequestedMeals = async () => {
            try {
                const response = await axios.get('https://hotel-management-server-omega.vercel.app/requested-meals');
                console.log(response.data); // Debugging: Log the API response
                setRequestedMeals(response.data);
            } catch (error) {
                console.error('Error fetching requested meals:', error);
            }
        };

        fetchRequestedMeals();
    }, []);

    const serveMeal = async (id) => {
        try {
            await axios.patch(`https://hotel-management-server-omega.vercel.app/requested-meals/${id}/deliver`);
            const response = await axios.get('https://hotel-management-server-omega.vercel.app/requested-meals');
            setRequestedMeals(response.data);
        } catch (error) {
            console.error('Error serving meal:', error);
        }
    };

    return (
        <div>
            <h2>Serve Meals</h2>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requestedMeals.map((meal) => (
                            <tr key={meal._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {meal.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {meal.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {meal.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {meal.status}
                                    </span>
                                </td>
                               
                                <td>
                                    <button
                                        onClick={() => serveMeal(meal._id)}
                                        disabled={meal.status === 'delivered'}
                                    >
                                        Serve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServeMeals;
