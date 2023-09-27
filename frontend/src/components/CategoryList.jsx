function CategoryList({ selectedCategory, onCategorySelect }) {
    const categories = ['All', 'Chairs', 'Tables', 'Beds', 'Lamps', 'Cabinets', 'Sofas'];
  
    return (
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer ${selectedCategory === category ? 'text-blue-500' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    );
  }
  
  export default CategoryList;
  