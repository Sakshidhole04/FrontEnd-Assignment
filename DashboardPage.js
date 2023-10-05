// DashboardPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  }, [searchTerm, data]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const filtered = data.filter((item) => item.company.name === e.target.value);
    setFilteredData(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const departments = [...new Set(data.map((item) => item.company.name))];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2E86C1' }}>Dashboard</h1>
      <div>
        <label htmlFor="filter" style={{ color: '#2E86C1' }}>Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #AED6F1',
          }}
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="search" style={{ color: '#2E86C1' }}>Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #AED6F1',
          }}
        />
      </div>
      <table
        style={{
          marginTop: '20px',
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#AED6F1' }}>Name</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#AED6F1' }}>Email</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#AED6F1' }}>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '10px', backgroundColor: '#F2F4F4' }}>{user.name}</td>
              <td style={{ padding: '10px', backgroundColor: '#F2F4F4' }}>{user.email}</td>
              <td style={{ padding: '10px', backgroundColor: '#F2F4F4' }}>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default DashboardPage;
