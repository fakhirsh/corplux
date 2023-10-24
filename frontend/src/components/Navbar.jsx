import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Products } from '../data/mockData';
import { menuState } from '../Global';
import { useRecoilState } from 'recoil';


////////////////////////////////////////////////////////////////////////////////
export const getRandomProducts = (products, count) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
////////////////////////////////////////////////////////////////////////////////


export default function Navbar() {

    const navigate = useNavigate();
    const [menu, setMenu] = useRecoilState(menuState);

    const toggleMenu = () => {
        setMenu(prevMenu => !prevMenu); // Toggle the menu state
        console.log("Navbar, is menu open: ", menu);
    };

    const contactButtonClick = () => {
        navigate("/contact");
    }
    
    const cartButtonClick = () => {
        const randomProducts = getRandomProducts(Products, 5);
 
        navigate("/cart", {
            state: { cartItems: randomProducts }
        });
    }

    return (
        
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-black bg-opacity-50 z-50">
            <a href="/" className="text-slate-300 text-2xl hover:underline">Corplux</a>
            <div className="flex space-x-4">                
                <button 
                    className="text-slate-100"
                    onClick={cartButtonClick}
                >
                    <ShoppingCartIcon className="h-6 w-6 text-red-500" />
                </button>
                <button
                    className="md:hidden"
                    onClick={toggleMenu}
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>
            
        </div>
    );
}