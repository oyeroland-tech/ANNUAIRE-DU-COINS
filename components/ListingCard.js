function ListingCard({ listing }) {
  try {
    return (
      <a
        href={`profile.html?id=${listing.id}`}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
        data-name="listing-card"
        data-file="components/ListingCard.js"
      >
        <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2">{listing.name}</h3>
          <p className="text-sm text-[var(--text-light)] mb-4 line-clamp-2">{listing.description}</p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-light)]">
            <div className="icon-phone text-base"></div>
            <span>{listing.phone}</span>
          </div>
        </div>
      </a>
    );
  } catch (error) {
    console.error('ListingCard component error:', error);
    return null;
  }
}