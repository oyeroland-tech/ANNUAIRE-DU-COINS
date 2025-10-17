# Annuaire Communautaire

Un annuaire de services communautaire moderne et responsive pour trouver des artisans, commerces et services locaux.

## Pages

- **index.html** : Page d'accueil avec moteur de recherche et catégories populaires
- **categories.html** : Page de navigation par catégories avec filtres
- **profile.html** : Page de profil détaillé d'un service
- **register.html** : Formulaire d'inscription pour les nouveaux services

## Fonctionnalités

- 🔍 Moteur de recherche intelligent
- 📱 Design responsive optimisé mobile
- 🗺️ Arrière-plan avec carte de la Côte d'Ivoire
- 👥 Mise en avant de la communauté ivoirienne
- 📊 Statistiques de la communauté
- 📋 Catégories de services (Artisans, Commerces, Services, Restauration, Santé, Éducation, Hébergement & Logement, Services Techniques & Énergie)
- 📞 Informations de contact (téléphone, WhatsApp, email)
- 📝 Formulaire d'inscription intégré avec Formspree

## Structure

```
/
├── index.html
├── categories.html
├── profile.html
├── register.html
├── app.js
├── categories-app.js
├── profile-app.js
├── register-app.js
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── SearchBar.js
│   ├── CategoryCard.js
│   ├── ListingCard.js
│   └── Alert.js
└── utils/
    └── data.js
```

## Configuration Formspree

Pour activer le formulaire d'inscription :
1. Créez un compte sur [Formspree](https://formspree.io)
2. Créez un nouveau formulaire
3. Remplacez `YOUR_FORM_ID` dans `register-app.js` par votre ID Formspree

## Technologies

- React 18
- TailwindCSS
- Lucide Icons