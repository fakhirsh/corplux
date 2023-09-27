function ProductCard({ product, onClick }) {
    return (
      <div className="border p-4 rounded cursor-pointer w-64" onClick={onClick}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h2 className="mt-2 text-xl">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-red-500 mt-2">${product.price}</p>
        <p className="mt-1">Rating: {product.rating}⭐</p>
      </div>
    );
  }
  
  export default ProductCard;
  