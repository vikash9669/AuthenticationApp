import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container min-h-screen mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Employees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div key={employee._id} className="bg-white p-6 rounded-lg shadow-lg">
            {employee.imgUrl && (
              <img
                src={employee.imgUrl}
                alt={employee.name}
                className="w-full h-48 object-cover object-center rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> {employee.email}</p>
            <p className="text-gray-700 mb-2"><strong>Phone:</strong> {employee.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
