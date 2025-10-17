class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Une erreur s'est produite</h1>
            <p className="text-gray-600 mb-4">Veuillez recharger la page</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">
              Recharger
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (query) => {
      setSearchQuery(query);
      window.location.href = `categories.html?search=${encodeURIComponent(query)}`;
    };

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header />
        
        <main>
          <section className="hero-map-bg text-white py-24 px-4 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-gray-900 bg-opacity-30 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
                <span className="text-2xl">🇨🇮</span>
                <div className="icon-map-pin text-lg text-white"></div>
                <span className="text-sm font-medium text-white">Côte d'Ivoire</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl text-white">Votre communauté, vos services</h1>
              <p className="text-xl mb-4 text-white drop-shadow-lg font-medium">Connectez-vous aux artisans, commerces et services locaux</p>
              <p className="text-lg mb-8 text-white drop-shadow-lg">Un annuaire pour renforcer notre communauté ivoirienne</p>
              <SearchBar onSearch={handleSearch} />
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="icon-users text-2xl text-blue-600"></div>
                </div>
                <div className="text-3xl font-bold text-[var(--text-dark)] mb-1">500+</div>
                <div className="text-sm text-[var(--text-light)]">Membres actifs</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="icon-briefcase text-2xl text-green-600"></div>
                </div>
                <div className="text-3xl font-bold text-[var(--text-dark)] mb-1">261</div>
                <div className="text-sm text-[var(--text-light)]">Services</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="icon-map text-2xl text-purple-600"></div>
                </div>
                <div className="text-3xl font-bold text-[var(--text-dark)] mb-1">50+</div>
                <div className="text-sm text-[var(--text-light)]">Villes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="icon-star text-2xl text-orange-600"></div>
                </div>
                <div className="text-3xl font-bold text-[var(--text-dark)] mb-1">98%</div>
                <div className="text-sm text-[var(--text-light)]">Satisfaction</div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 text-center">Catégories populaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);