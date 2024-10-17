'use client'

import React, { useState, FormEvent } from 'react';

function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault(); // Prevents the form from submitting and causing a page reload

    try {
      // Fetching data from the API endpoint
      const response = await fetch(`/api/alltokens?q=${query}`);
      const data = await response.json();

      setResults(data.token);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        ) : (
          <p>No Data</p>  
        )}
      </div>
    </div>
  );
};

export default SearchBar;
