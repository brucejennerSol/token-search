'use client'

import React, { useState, FormEvent, useEffect } from 'react';

interface SearchResult {
  id: number
  name: string,
}

function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState<string>(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query); 
    }, 200);

    // Cleanup function to clear timeout if the user types again before 200ms
    return () => {
      clearTimeout(handler);
    };
  }, [query]); 


  
  // Fetch data when debounced query changes
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery) {
        try {
          const response = await fetch(`/api/alltokens?q=${debouncedQuery}`);
          const data = await response.json();
          setResults(data.token); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [debouncedQuery]); 

  return (
    <div>
      <form onSubmit={(e: FormEvent) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
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
