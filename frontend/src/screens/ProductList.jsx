import { useState } from 'react';
import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Products } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { menuState, selectedCategoryState } from '../Global';
import { useRecoilState } from 'recoil';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component

function ProductListPage() {
    //const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
    
    const [searchTerm, setSearchTerm] = useState('');
    //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //const [menuOpen, setMenuOpen] = useRecoilState(menuState);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredProducts = Products.filter((product) => {
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
            return false;
        }
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="product-list bg-gray-100 min-h-screen flex pl-0 md:pl-64">
            <Sidebar />
            
            <main className=" products-section p-4 flex-grow">
                <div className=' w-full pb-6 flex justify-center'>
                    <SearchBar onSearch={setSearchTerm} />
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center items-center">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => {
                                console.log('Product clicked', product.id);
                                navigate("/details", { state: { productData: product } });
                            }}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductListPage;
