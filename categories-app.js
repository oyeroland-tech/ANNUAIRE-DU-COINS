function CategoriesApp() {
  try {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [listings, setListings] = React.useState(SAMPLE_LISTINGS);

    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category');
      const search = params.get('search');
      
      if (category) setSelectedCategory(category);
      if (search) setSearchQuery(search);
    }, []);

    const filteredListings = listings.filter(listing => {
      const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return (
      <div className="min-h-screen" data-name="categories-app" data-file="categories-app.js">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Parcourir les services</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === 'all' 
                  ? 'bg-[var(--primary-color)] text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tous
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat.id 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun service trouvé</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('CategoriesApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CategoriesApp />);