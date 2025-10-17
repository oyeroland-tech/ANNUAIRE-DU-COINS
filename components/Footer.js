function Footer() {
  try {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 px-4" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">À propos</h3>
              <p className="text-sm">Votre annuaire local pour trouver les meilleurs services de votre communauté.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="index.html" className="hover:text-white transition">Accueil</a></li>
                <li><a href="categories.html" className="hover:text-white transition">Catégories</a></li>
                <li><a href="register.html" className="hover:text-white transition">S'inscrire</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p className="text-sm">Email: contact@annuaire-local.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Annuaire Local. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}