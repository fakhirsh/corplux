import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html, OrbitControls, PresentationControls, Text, Torus, useGLTF } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ARButton, XR, useXR } from '@react-three/xr';
import { useControls } from 'leva';

import * as THREE from 'three';

function Dialog({ onClose }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-10 rounded-lg relative">
                <button 
                    onClick={onClose} 
                    className=" bg-gray-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center absolute top-4 right-4 cursor-pointer"
                >
                    <XMarkIcon />
                </button>
          <h1>Success</h1>
          <h3>Item added to cart</h3>
        </div>
      </div>
    );
  }

function Model({productData}) {
    const { scene, cameras } = useGLTF(productData.url);
    // Compute the bounding box of the scene
    const { camera, size } = useThree();
    
    // useFrame(() => {
    //     console.log(camera.position, "\n", camera.rotation);
    // },[]);

    // const {x,y,z} = useControls('Camera', {
    //     x: {value: 0, min: -10, max: 10, step: 0.1},
    //     y: {value: 0, min: -10, max: 10, step: 0.1},
    //     z: {value: 0, min: -10, max: 10, step: 0.1},
    // });

    // Assuming the GLB has only one camera; adjust as needed.
    const glbCamera = cameras[0];
    // console.log(glbCamera);

    // Set the default camera's position, rotation, etc., based on the GLB's camera.
    camera.position.copy(glbCamera.position);
    camera.rotation.copy(glbCamera.rotation);     
    camera.fov = glbCamera.fov;
    camera.updateProjectionMatrix();  // Important after changing properties!

    /////////////////////////////////////////////////////////////////
    const box = useState(new THREE.Box3().setFromObject(scene))[0];
    //const box = new THREE.Box3().setFromObject(scene);
    console.log("Scene Box: ", box);

    // Create the bounding box helper and add it to the scene
    const boxHelper = new THREE.Box3Helper(box, 0xffff00); // Yellow color for visualization
    scene.add(boxHelper);

    // Create and add the AxesHelper
    // const axesSize = 2;
    // const axesHelper = new THREE.AxesHelper(axesSize);
    // scene.add(axesHelper);
    ///////////////////////////////////////////////////////////////

    // Compute the bounding box of the model
    // const box = new THREE.Box3().setFromObject(scene);
    // const boxSize = new THREE.Vector3();
    // box.getSize(boxSize);

    // Calculate position for the info card (plane)
    // For instance, placing it to the right of the model
    // let cardPosition = new THREE.Vector3(
    //     box.max.z + 0.5, // Adding 0.5 for some space between model and card
    //     (box.max.y + box.min.y) / 2, // Center it vertically
    //     (box.max.x + box.min.x) / 2  // Center it depth-wise
    // );

    // let cardPosition = new THREE.Vector3();
    // let cardRotation = new THREE.Euler();

    // // Traverse the scene to find "info_card" and update its material
    // scene.traverse((child) => {
    //     console.log(child.name);
    //     if (child.isMesh && child.name === "card_anchor") {
    //         child.material.side = THREE.FrontSide;
    //         child.material.needsUpdate = true; // Update the material

    //         cardPosition = child.position.clone();
    //         console.log(cardPosition);
    //         cardRotation = child.rotation;

    //         child.visible = false;
    //         child.parent.remove(child);
    //     }
    // });

    return (
        <>
            <primitive object={scene} />
            {/* <Text position={[axesSize + 0.5, 0, 0]} fontSize={0.5} color="red">X</Text>
            <Text position={[0, axesSize + 0.5, 0]} fontSize={0.5} color="green">Y</Text>
            <Text position={[0, 0, axesSize + 0.5]} fontSize={0.5} color="blue">Z</Text> */}
            {/* <ContactShadows position={[0, box.min.y, 0]} opacity={0.7} scale={30} blur={1} /> */}
            <Html 
                 center
                transform
                // occlude
                distanceFactor={0.75}
                // scale={10}
                position={[box.max.x+0.2,-0.1,box.min.z]}
            >
                <div className='bg-slate-500 bg-opacity-70 p-2 rounded-xl' style={{width:'200px', transform: 'translateX(50%)'}}>
                    <h2 className="mt-4 text-2xl text-white font-bold glow-text">{productData.name}</h2>
                    <p className="mt-2 text-white glow-text">{productData.description}</p>
                    <p className="mt-2 text-cyan-100 glow-text font-bold text-2xl">${productData.price}</p>
                    <p className="mt-1 text-white glow-text">Rating: {productData.rating}⭐</p>
                    <p className="mt-2 text-white glow-text"><strong>Category:</strong> {productData.category}</p>
                    <button 
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                        onClick={() => {
                            setDialogVisible(true)
                        }}
                    >
                        Add to Cart
                    </button>
                    {/* {isDialogVisible && <Dialog onClose={() => setDialogVisible(false)} />} */}
                </div>
            </Html>
        </>
    );
}

export default function Details() {
    const location = useLocation();
    const productData = location.state?.productData;
    const [isDialogVisible, setDialogVisible] = useState(false);

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

    // const {isPresenting} = useXR();

    // const Donut = () => {
    //     useFrame(({ clock }) => {
    //         ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.5;
    //         ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.5;

    //     });
    //     const ref = useRef();

    //     return (
    //         <Torus args={[1, 0.4, 16, 100]} ref={ref}>
    //             {/* <meshNormalMaterial attach="material" /> */}
    //             <meshStandardMaterial attach="material" color="hotpink" />
    //         </Torus>
    //     );
    // };

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
                                <hemisphereLight groundColor="white" />
                                {/* <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} /> */}
                                {/* <Donut /> */}
                                
                                {/* <PresentationControls
                                    config={{ mass: 2, tension: 500 }}
                                    snap={{ mass: 2, tension: 700 }}
                                    rotation={[0, 0.3, 0]}
                                    polar={[-Math.PI / 3, Math.PI / 3]}
                                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                                > */}
                                    <Model productData={productData} />
                                {/* </PresentationControls> */}

                                <Environment
                                    preset="apartment" 
                                    blur={0.8}
                                    background
                                    // ground={{
                                    //     height: 15, // Height of the camera that was used to create the env map (Default: 15)
                                    //     radius: 60, // Radius of the world. (Default 60)
                                    //     scale: 100, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
                                    //   }}
                                />
                                <OrbitControls />
                            </XR>
                        </Canvas>
                    </div>
                    {/* Product detrails */}
                    {/* <div className='bg-slate-500 bg-opacity-70 absolute top-3 right-3 p-5 rounded-xl' style={{width:'300px'}}>
                        <h2 className="mt-4 text-2xl text-white font-bold glow-text">{productData.name}</h2>
                        <p className="mt-2 text-white glow-text">{productData.description}</p>
                        <p className="mt-2 text-cyan-100 glow-text font-bold text-2xl">${productData.price}</p>
                        <p className="mt-1 text-white glow-text">Rating: {productData.rating}⭐</p>
                        <p className="mt-2 text-white glow-text"><strong>Category:</strong> {productData.category}</p>
                        <button 
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => {
                                setDialogVisible(true)
                            }}
                        >
                            Add to Cart
                        </button>
                        {isDialogVisible && <Dialog onClose={() => setDialogVisible(false)} />}
                    </div> */}
                </div>
            )}
        </div>
    );
}
