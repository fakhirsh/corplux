import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ARButton, XR } from '@react-three/xr';

import XRScene from '../components/XRScene';

export default function Details() {
    const location = useLocation();
    const productData = location.state?.productData;

    const [arSupported, setARSupported] = useState(false);
    useEffect(() => {
        async function checkSupport() {
            if (navigator.xr && navigator.xr.isSessionSupported) {
                const supported = await navigator.xr.isSessionSupported('immersive-ar');
                setARSupported(supported);
                console.log("AR Supported: ", supported);
            } else {
                setARSupported(false);
                console.log('AR not supported');
            }
        }
        checkSupport();
    }, []);
 
    return ( 
        <div className="px-4 py-6 h-full flex flex-col">
            {/* Back Button */}
            <button 
                onClick={() => window.history.back()} 
                className="py-1 px-3 mt-20 bg-gray-200 hover:bg-gray-300 rounded absolute top-2 left-2"
            >
                ←
            </button>

            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            {productData && (
                <div className="relative flex flex-col md:flex-row gap-8 flex-grow">

                    {/* Render 3D model */}
                    <div className="product-details bg-slate-800 flex-1 h-full min-h-0">
                        <div className='self-start'>
                            {arSupported && <ARButton
                                sessionInit={{
                                    requiredFeatures: ['hit-test'],
                                    // optionalFeatures: ['dom-overlay'],
                                    // domOverlay: { root: document.body }
                                }}
                                />
                            }
                        </div>
                        
                        <Canvas>
                            <XR>
                                <XRScene />
                            </XR>
                        </Canvas>
                    </div>
                </div>
            )}
        </div>
    );
}
