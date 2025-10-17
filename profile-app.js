function ProfileApp() {
  try {
    const [listing, setListing] = React.useState(null);

    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get('id'));
      const found = SAMPLE_LISTINGS.find(l => l.id === id);
      setListing(found || SAMPLE_LISTINGS[0]);
    }, []);

    if (!listing) return <div>Chargement...</div>;

    return (
      <div className="min-h-screen" data-name="profile-app" data-file="profile-app.js">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src={listing.image} alt={listing.name} className="w-full h-64 object-cover" />
            
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
              <p className="text-[var(--text-light)] mb-8">{listing.description}</p>

              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold mb-4">Coordonnées</h2>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <div className="icon-phone text-xl text-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-light)]">Téléphone</p>
                    <a href={`tel:${listing.phone}`} className="text-[var(--text-dark)] font-medium hover:text-[var(--primary-color)]">
                      {listing.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <div className="icon-message-circle text-xl text-green-600"></div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-light)]">WhatsApp</p>
                    <a href={`https://wa.me/${listing.whatsapp}`} target="_blank" className="text-[var(--text-dark)] font-medium hover:text-[var(--primary-color)]">
                      Envoyer un message
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <div className="icon-mail text-xl text-purple-600"></div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-light)]">Email</p>
                    <a href={`mailto:${listing.email}`} className="text-[var(--text-dark)] font-medium hover:text-[var(--primary-color)]">
                      {listing.email}
                    </a>
                  </div>
                </div>
              </div>

              <a href="categories.html" className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline">
                <div className="icon-arrow-left text-lg"></div>
                Retour aux catégories
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('ProfileApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);