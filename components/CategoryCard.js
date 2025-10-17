function CategoryCard({ category }) {
  try {
    return (
      <a
        href={`categories.html?category=${category.id}`}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
        data-name="category-card"
        data-file="components/CategoryCard.js"
      >
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${category.bgColor}`}>
            <div className={`icon-${category.icon} text-2xl ${category.iconColor}`}></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2 group-hover:text-[var(--primary-color)] transition">
              {category.name}
            </h3>
            <p className="text-sm text-[var(--text-light)]">{category.count} services</p>
          </div>
          <div className="icon-chevron-right text-xl text-gray-300 group-hover:text-[var(--primary-color)] transition"></div>
        </div>
      </a>
    );
  } catch (error) {
    console.error('CategoryCard component error:', error);
    return null;
  }
}