import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { menuState, selectedCategoryState } from '../Global';
import CategoryList from './CategoryList';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    //const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
    const [menuOpen, setMenuOpen] = useRecoilState(menuState);

    return (
        <aside className={`
                            fixed 
                            left-0 
                            top-16
                            bottom-0 
                            w-64 
                            bg-white 
                            p-4 
                            transform 
                            transition-transform duration-300 ease-in-out 
                            ${menuOpen ? 'translate-x-0' : '-translate-x-full'} 
                            md:translate-x-0
                            flex
                            flex-col
                        `}
        >
            <div className="overflow-y-auto">
                {/* Close Button (only on smaller screens) */}
                <button 
                    onClick={() => setMenuOpen(false)} 
                    className=" md:hidden 
                                bg-gray-500 
                                text-white 
                                p-2 
                                rounded-full
                                w-8 h-8 
                                flex 
                                items-center 
                                justify-center 
                                absolute 
                                top-4 
                                right-4 
                                cursor-pointer"
                >
                    <XMarkIcon />
                </button>
                
                <CategoryList
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </div>

            <div className='mt-auto pb-4'>
                <hr className="my-4" />
                <Link to="/contact" className="block mb-4 hover:underline">Contact</Link>
                <small className="text-gray-500">&copy; {new Date().getFullYear()} Corplux</small>
            </div>
        </aside>
        
    );
}
