import React, { useState, FormEvent, ChangeEvent } from 'react';

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-container"
      data-testid="search-form"
    >
      <input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search characters..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
