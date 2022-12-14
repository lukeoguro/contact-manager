function Filter({ query, handleQueryChange }) {
  return (
    <div>
      Filter by: <input value={query} onChange={handleQueryChange} />
    </div>
  );
}

export default Filter;