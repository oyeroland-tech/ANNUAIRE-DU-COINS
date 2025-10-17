function SearchBar({ onSearch }) {
  try {
    const [query, setQuery] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" data-name="search-bar" data-file="components/SearchBar.js">
        <div className="flex gap-2 bg-white rounded-lg p-2 shadow-lg">
          <div className="flex-1 flex items-center gap-2 px-3">
            <div className="icon-search text-xl text-gray-400"></div>
            <input
              type="text"
              placeholder="Rechercher un service, artisan, commerce..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[var(--secondary-color)] text-white rounded-lg hover:bg-amber-600 transition font-medium"
          >
            Rechercher
          </button>
        </div>
      </form>
    );
  } catch (error) {
    console.error('SearchBar component error:', error);
    return null;
  }
}