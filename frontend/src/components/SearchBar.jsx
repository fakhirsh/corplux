function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="p-2 rounded w-7/10 max-w-full"
      />
    );
  }
  
  export default SearchBar;
  