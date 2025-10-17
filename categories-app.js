<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ServicePro - Catalogue de Services</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- React, ReactDOM, and Babel for JSX compilation -->
    <!-- FIX: React DOIT être chargé avant ReactDOM pour éviter ReferenceError: ReactDOM is not defined -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- PapaParse pour l'analyse CSV. C'est la dépendance qui causait l'erreur. -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
    <!-- Lucide Icons pour des icônes légères -->
    <script src="https://unpkg.com/lucide@latest"></script> 
    <style>
        :root {
            --primary-color: #4F46E5; /* Indigo 600 */
            --secondary-color: #10B981; /* Emerald 500 */
        }
        body { margin: 0; background-color: #f0f4f8; font-family: 'Inter', sans-serif; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // La logique complète de l'application est maintenant définie ici.
        const { useState, useEffect } = React;

        // --- VARIABLES ET COMPOSANTS ---

        // Les catégories utilisées pour les boutons (doivent correspondre aux valeurs 'category' de la feuille Google)
        const CATEGORIES = [
          { id: "plomberie", name: "Plomberie" },
          { id: "electricite", name: "Électricité" },
          { id: "menuiserie", name: "Menuiserie" },
        ];
        
        // Composant d'icône simple pour les titres
        const BriefcaseIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 text-[var(--primary-color)]">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/><path d="M10 2l4 2"/><path d="M12 12h.01"/>
            </svg>
        );
        
        // Composant d'icône d'appel (téléphone)
        const PhoneIcon = () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-5.65-5.65 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
        );
        
        // NOUVEAU COMPOSANT : Arbres de Cohésion Communautaire
        const CommunityTreesIcon = () => (
            <svg 
                className="w-40 h-40 mx-auto mb-10 text-[var(--secondary-color)]"
                viewBox="0 0 200 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Ligne de terre */}
                <path d="M0 90 H200" stroke="#374151" strokeWidth="2" />
                
                {/* Arbre 1 (Gauche) */}
                <circle cx="50" cy="40" r="15" fill="#4B5563" />
                <rect x="45" y="55" width="10" height="35" fill="#9CA3AF" rx="5" />

                {/* Arbre 2 (Centre, Dominant) */}
                <circle cx="100" cy="30" r="20" fill="#10B981" />
                <rect x="95" y="50" width="10" height="40" fill="#059669" rx="5" />
                
                {/* Arbre 3 (Droite) */}
                <circle cx="150" cy="45" r="12" fill="#4B5563" />
                <rect x="146" y="57" width="8" height="33" fill="#9CA3AF" rx="4" />

                {/* Connexions (Symbole de la cohésion) */}
                <path d="M65 40 Q80 20 95 35" stroke="#4F46E5" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4,4"/>
                <path d="M115 35 Q130 15 148 45" stroke="#4F46E5" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4,4"/>
            </svg>
        );


        const Header = () => (
          <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-indigo-100">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <BriefcaseIcon />
                <div className="text-2xl font-extrabold text-[var(--primary-color)]">ServicePro</div>
              </div>
              <nav>
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)] font-medium transition mx-3 hidden sm:inline">Accueil</a>
                <a href="#" className="text-gray-600 hover:text-[var(--primary-color)] font-medium transition mx-3 hidden sm:inline">Contact</a>
                <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-200 shadow-md">
                    Ajouter un service
                </button>
              </nav>
            </div>
          </header>
        );

        const Footer = () => (
          <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="text-lg font-bold mb-2">ServicePro</div>
              <p className="text-sm">Votre plateforme de services locaux de confiance.</p>
              <p className="text-xs mt-4">© {new Date().getFullYear()} ServicePro. Tous droits réservés.</p>
            </div>
          </footer>
        );

        const ListingCard = ({ listing }) => {
          if (!listing.id || !listing.name) return null;

          const getCategoryName = (id) => {
            const cat = CATEGORIES.find(c => c.id === id);
            return cat ? cat.name : id;
          };
          
          const categoryColorClass = listing.category === 'plomberie' ? 'bg-blue-100 text-blue-800' :
                                     listing.category === 'electricite' ? 'bg-yellow-100 text-yellow-800' :
                                     listing.category === 'menuiserie' ? 'bg-amber-100 text-amber-800' :
                                     'bg-indigo-100 text-indigo-800';

          return (
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 overflow-hidden border-b-4 border-[var(--secondary-color)]">
              <div className="p-6 flex flex-col h-full">
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start ${categoryColorClass}`}>
                  {getCategoryName(listing.category)}
                </span>
                <h2 className="text-2xl font-extrabold mb-2 text-gray-900">{listing.name}</h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">{listing.description}</p>
                
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                  {listing.price && (
                    <div className="flex items-baseline">
                      <p className="text-2xl font-bold text-[var(--secondary-color)] mr-1">{listing.price}</p>
                      <span className="text-gray-500">€</span>
                    </div>
                  )}
                  <button
                    className="flex items-center bg-[var(--primary-color)] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition duration-300 shadow-lg"
                    onClick={() => window.location.href = `mailto:${listing.email || 'contact@servicepro.com'}?subject=Demande de service pour ${listing.name}`}
                  >
                    <PhoneIcon />
                    Contacter
                  </button>
                </div>
              </div>
            </div>
          );
        };
        // ---------------------------------------------------------------------------------

        // L'URL de votre feuille Google (format CSV)
        const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvPrIzCt4-XG1_Vuo_skLCjuM2t3vSO5h0I5tmFz-64wM9jYBhz-Mikdqq-_s_hlv24oxTm8AQhv8S/pub?gid=0&single=true&output=csv";

        function CategoriesApp() {
          const [selectedCategory, setSelectedCategory] = useState("all");
          const [searchQuery, setSearchQuery] = useState("");
          const [listings, setListings] = useState([]);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          const [lastUpdated, setLastUpdated] = useState(null); // NOUVEAU: Horodatage de la dernière mise à jour

          // 1. Logique de chargement des données (fetch + PapaParse)
          useEffect(() => {
            const loadListings = async () => {
              try {
                // Vérification de PapaParse 
                if (typeof Papa === 'undefined') {
                    throw new Error("Erreur critique: La librairie d'analyse de données n'a pas été chargée.");
                }

                const response = await fetch(GOOGLE_SHEET_URL);
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const csvText = await response.text();
                
                // PapaParse pour convertir le CSV en JSON
                Papa.parse(csvText, {
                  header: true,
                  skipEmptyLines: true,
                  // Configuration pour nettoyer les noms des en-têtes :
                  transformHeader: (header) => header.trim().toLowerCase(), 
                  complete: (result) => {
                    // S'assurer que chaque ligne a un ID unique
                    const dataWithIds = result.data
                      .filter(item => item.name && item.category) // Filtrer les lignes essentielles vides
                      .map((item, index) => ({
                        id: item.id || `listing-${index}-${Math.random().toString(16).slice(2)}`,
                        ...item
                      }));
                    
                    setListings(dataWithIds);
                    setLoading(false);
                    setLastUpdated(new Date()); // METTRE À JOUR L'HORODATAGE
                  },
                  error: (err) => {
                    console.error("Erreur PapaParse:", err);
                    setError("Erreur lors de l'analyse des données.");
                    setLoading(false);
                  }
                });

              } catch (e) {
                console.error("Erreur de chargement:", e);
                setError("Impossible de charger les données. Vérifiez l'URL ou la connexion.");
                setLoading(false);
              }
            };

            loadListings();
          }, []);

          // 2. Logique de lecture des paramètres d'URL (pour le partage)
          useEffect(() => {
            if (typeof window !== 'undefined' && window.location) {
              const params = new URLSearchParams(window.location.search);
              const category = params.get("category");
              const search = params.get("search");
              if (category) setSelectedCategory(category);
              if (search) setSearchQuery(search);
            }
          }, []);

          // 3. Logique de filtrage et de recherche
          const filteredListings = listings.filter((listing) => {
            // Vérifier si la catégorie correspond
            const matchesCategory =
              selectedCategory === "all" || listing.category.toLowerCase().trim() === selectedCategory;
            
            // Vérifier si la recherche correspond
            const matchesSearch =
              !searchQuery ||
              (listing.name &&
                listing.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (listing.description &&
                listing.description.toLowerCase().includes(searchQuery.toLowerCase()));
                
            return matchesCategory && matchesSearch;
          });

          // 4. Rendu du composant
          return (
            <div className="min-h-screen font-sans" style={{ '--primary-color': '#4F46E5', '--secondary-color': '#10B981' }}>
              <Header />

              <main className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-5xl font-extrabold mb-4 text-gray-900 text-center">Trouvez votre Pro local</h1>
                
                {/* Affichage de l'horodatage pour vérification */}
                {lastUpdated && (
                    <p className="text-center text-sm text-gray-500 mb-8 font-medium">
                        Dernière mise à jour des données : **{lastUpdated.toLocaleTimeString()}**
                    </p>
                )}

                {/* L'illustration de la cohésion communautaire est insérée ici */}
                <CommunityTreesIcon />

                {/* Barre de recherche */}
                <div className="mb-10 p-5 bg-white rounded-2xl shadow-xl border-t-4 border-indigo-200">
                  <input
                    type="text"
                    placeholder="Rechercher un service par nom ou description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-[var(--primary-color)] transition duration-200"
                  />
                </div>

                {/* Boutons de Catégorie */}
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className={`px-6 py-2 rounded-full text-base font-bold transition duration-300 shadow-md ${
                      selectedCategory === "all"
                        ? "bg-[var(--primary-color)] text-white hover:bg-indigo-700 ring-4 ring-indigo-200"
                        : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-gray-900 border border-gray-300"
                    }`}
                  >
                    Tous les services
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-6 py-2 rounded-full text-base font-bold transition duration-300 shadow-md ${
                        selectedCategory === cat.id
                          ? "bg-[var(--primary-color)] text-white hover:bg-indigo-700 ring-4 ring-indigo-200"
                          : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-gray-900 border border-gray-300"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Affichage des annonces */}
                {loading && (
                  <div className="text-center py-20 text-gray-500 text-xl">
                    <svg className="animate-spin h-10 w-10 text-[var(--primary-color)] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement des services en cours...
                  </div>
                )}
                
                {error && (
                  <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl relative my-12 shadow-md" role="alert">
                    <strong className="font-extrabold text-lg">Erreur de données : </strong>
                    <span className="block sm:inline text-base">{error}</span>
                    <p className="text-sm mt-3 font-medium">Veuillez vérifier que la première ligne de votre feuille Google contient bien les en-têtes : **id, name, category, description, price, email** (etc.) en minuscules.</p>
                  </div>
                )}

                {!loading && !error && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                )}

                {!loading && !error && filteredListings.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-lg mt-8 border-t-4 border-gray-300">
                    <p className="text-gray-500 text-xl font-semibold">Aucun service trouvé pour les critères de recherche ou de catégorie actuels.</p>
                  </div>
                )}

              </main>

              <Footer />
            </div>
          );
        }

        // Rendu de l'application React
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<CategoriesApp />);
    </script>
</body>
</html>
