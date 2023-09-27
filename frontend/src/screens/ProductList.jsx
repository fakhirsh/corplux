import { useState } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Products } from '../data/mockData';

function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = Products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-list bg-gray-100 pt-20 min-h-screen flex">
      <aside className="categories w-1/4 bg-white p-4 border-r sticky top-0">
        <CategoryList
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </aside>
      <main className="products-section w-3/4 float-right p-4">
        <SearchBar onSearch={setSearchTerm} />
        <div className="products-grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center align-items-start">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => console.log('Product clicked', product.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductListPage;
