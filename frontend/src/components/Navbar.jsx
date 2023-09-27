import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid'


export default function Navbar() {

    const navigate = useNavigate();

    const contactButtonClick = () => {
        navigate("/contact");
    }
    const cartButtonClick = () => {
        navigate("/cart");
    }

    return (
        
        <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-black bg-opacity-50 z-50">
            <a href="/" className="text-slate-300 text-2xl hover:underline">Corplux</a>
            <div className="flex space-x-4">
                <button 
                    className="text-slate-700"
                    onClick={contactButtonClick}
                >
                    Contact
                </button>
                <button 
                    className="text-slate-100"
                    onClick={cartButtonClick}
                >
                    <ShoppingCartIcon className="h-6 w-6 text-red-500" />
                    

                </button>
            </div>
            
        </div>
    );
}