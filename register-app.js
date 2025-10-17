function RegisterApp() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      category: '',
      description: '',
      phone: '',
      whatsapp: '',
      email: '',
      image: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [alert, setAlert] = React.useState(null);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setAlert(null);

      try {
        const response = await fetch('https://formspree.io/f/xyznowej', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setAlert({ type: 'success', message: 'Inscription réussie ! Votre profil sera vérifié et ajouté sous peu.' });
          setFormData({
            name: '',
            category: '',
            description: '',
            phone: '',
            whatsapp: '',
            email: '',
            image: ''
          });
        } else {
          setAlert({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' });
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'Erreur de connexion. Veuillez vérifier votre connexion internet.' });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen" data-name="register-app" data-file="register-app.js">
        <Header />
        
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-2">Inscription</h1>
            <p className="text-[var(--text-light)] mb-8">Inscrivez votre service dans notre annuaire communautaire</p>

            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom du service *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="Ex: Plomberie Martin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Catégorie *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="Décrivez vos services..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="+33612345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="contact@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL de l'image</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'S\'inscrire'}
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('RegisterApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegisterApp />);