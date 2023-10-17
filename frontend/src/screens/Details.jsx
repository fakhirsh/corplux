import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ARButton, XR, useXR } from '@react-three/xr';

function Dialog({ onClose }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-lg relative">
                <button 
                    onClick={onClose} 
                    className=" bg-gray-500 
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
          <h1>Success</h1>
          <h3>Item added to cart</h3>
        </div>
      </div>
    );
  }

export default function Details() {
    const location = useLocation();
    const productData = location.state?.productData;
    const [isDialogVisible, setDialogVisible] = useState(false);

    //const {isPresenting} = useXR();
    
    const Donut = () => {
        useFrame(({ clock }) => {
            ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.5;
            ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.5;
        });
        const ref = useRef();

        return (
            <Torus args={[1, 0.4, 16, 100]} ref={ref}>
                <meshNormalMaterial attach="material" />
            </Torus>
        );
    };

    return (
        <div className="px-4 py-6 h-full flex flex-col">
            {/* Back Button */}
            <button 
                onClick={() => window.history.back()} 
                className="py-1 px-3 mt-20 bg-gray-200 hover:bg-gray-300 rounded absolute top-2 left-2"
            >
                ← Back
            </button>

            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            {productData && (
                <div className="flex flex-col md:flex-row gap-8 flex-grow">
                    {/* Render 3D model */}
                    <div className="product-details bg-green-100 flex-1 h-full min-h-0">
                        <div className='self-start'>
                            <ARButton
                                sessionInit={{
                                    requiredFeatures: ['hit-test'],
                                    optionalFeatures: ['dom-overlay'],
                                    domOverlay: { root: document.body }
                                }}
                            />
                        </div>
                        
                        <Canvas>
                            <XR>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <Donut />
                                <OrbitControls />
                            </XR>
                        </Canvas>
                    </div>
                    {/* Product detrails */}
                    <div className='bg-red-100 flex-1 p-4 h-full min-h-0 overflow-y-auto'>
                        <h2 className="mt-4 text-2xl font-bold">{productData.name}</h2>
                        <p className="mt-2 text-gray-600">{productData.description}</p>
                        <p className="mt-2 text-red-500">${productData.price}</p>
                        <p className="mt-1">Rating: {productData.rating}⭐</p>
                        <p className="mt-2"><strong>Category:</strong> {productData.category}</p>
                        <button 
                            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => {
                                setDialogVisible(true)
                            }}
                        >
                            Add to Cart
                        </button>
                        {isDialogVisible && <Dialog onClose={() => setDialogVisible(false)} />}
                    </div>
                </div>
            )}
        </div>
    );
}
