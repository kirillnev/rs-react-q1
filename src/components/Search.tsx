import React, { useState, FormEvent } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialQuery }) => {
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    onSearch(trimmedValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search characters..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
