import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

export default function Details() {
    const location = useLocation();
    const productData = location.state?.productData;

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
        <div className="bg-green-100">
            <h1>Product Details</h1>
            {productData && (
                <div 
                    className="product-details"
                    style={{ width: '80%', height: '400px', margin: '0 auto' }}
                >
                    {/* Render 3D model */}
                    <Canvas>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Donut />
                        <OrbitControls />
                    </Canvas>

                    <h2 className="mt-4 text-2xl font-bold">{productData.name}</h2>
                    <p className="mt-2 text-gray-600">{productData.description}</p>
                    <p className="mt-2 text-red-500">${productData.price}</p>
                    <p className="mt-1">Rating: {productData.rating}⭐</p>
                    <p className="mt-2"><strong>Category:</strong> {productData.category}</p>
                </div>
            )}
        </div>
    );
}
