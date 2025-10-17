function Header() {
  try {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="index.html" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-map-pin text-xl text-white"></div>
              </div>
              <span className="text-xl font-bold text-[var(--text-dark)]">Annuaire Local</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              <a href="index.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition">Accueil</a>
              <a href="categories.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition">Catégories</a>
              <a href="register.html" className="px-4 py-2 bg-[var(--secondary-color)] text-white rounded-lg hover:bg-amber-600 transition">S'inscrire</a>
            </nav>

            <button className="md:hidden">
              <div className="icon-menu text-2xl text-[var(--text-dark)]"></div>
            </button>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}