import React, { useEffect, useState } from 'react';
import './App.css';

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://xcountries-backend.labs.crio.do/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // The API already returns the data in the correct format
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (countries.length === 0) {
    return <div>Loading countries...</div>;
  }

  return (
    <div className="country-grid d-flex flex-wrap justify-content-center">
      {countries.map(country => (
        <div key={country.name} className="country-item">
          <img src={country.flag} alt={`Flag of ${country.name}`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryFlags;
