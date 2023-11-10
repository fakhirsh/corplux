import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Html, OrbitControls, PresentationControls, Text, Torus, useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
// import { v4 as uuidv4 } from 'uuid';

import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import CameraAdjuster from './CameraAdjuster';


function Dialog({ onClose }) {
    return (
      <div className="unselectable fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
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

// function calculateFOVForPortraitMode(){
//     return 55;
// }

// function calculateFOVForLandscapeMode(){
//     return 30;
// }

// function CameraAdjuster() {
//     const { camera, size } = useThree();
  
//     useEffect(() => {
//       // Your logic to adjust the camera
//       // For example, adjust the FOV or the camera's position
//       const aspectRatio = size.width / size.height;
      
//       if (aspectRatio < 1) {
//         // This is a tall screen (e.g., mobile device in portrait mode)
//         camera.fov = calculateFOVForPortraitMode(); // Define this function based on your needs
//       } else {
//         // This is a wide screen (e.g., desktop or mobile device in landscape mode)
//         camera.fov = calculateFOVForLandscapeMode(); // Define this function based on your needs
//       }
  
//       camera.updateProjectionMatrix();
//     }, [camera, size.width, size.height]);
  
//     return null; // This component does not render anything itself
//   }

function Model(props) {
    const { productData, isPresenting, position, id } = props;

    // console.log("Model --> props: ", props);
    // console.log("Model --> isPresenting: ", isPresenting, "Position: ", position, "id: ", id);

    const [isDialogVisible, setDialogVisible] = useState(false);

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
    //camera.fov = glbCamera.fov;
    camera.updateProjectionMatrix();  // Important after changing properties!

    /////////////////////////////////////////////////////////////////
    const box = useState(new THREE.Box3().setFromObject(scene))[0];

    // Create the bounding box helper and add it to the scene
    // const boxHelper = new THREE.Box3Helper(box, 0xffff00); // Yellow color for visualization
    // scene.add(boxHelper);

    let finalPosition = position;  // WARNING: THIS COULD BE NULL !!!

    if(!isPresenting){
        finalPosition = [0, -(box.max.y-box.min.y)/2, 0];
    }

    return (
        <>
            <group position={finalPosition} scale={[1,1,1]}>
                <primitive object={scene} />
            </group>
            {/* <Text position={[axesSize + 0.5, 0, 0]} fontSize={0.5} color="red">X</Text>
            <Text position={[0, axesSize + 0.5, 0]} fontSize={0.5} color="green">Y</Text>
            <Text position={[0, 0, axesSize + 0.5]} fontSize={0.5} color="blue">Z</Text> */}
            {!isPresenting &&
                <Html 
                    center
                    transform
                    // occlude="blending"
                    // occlude
                    distanceFactor={0.75}
                    // scale={10}
                    //position={[box.max.x+0.2,(box.max.y-box.min.y)/2,box.min.z]}
                    position={[box.max.x+0.2,0,box.min.z]}
                >
                    <div className='unselectable bg-slate-500 bg-opacity-70 p-2 rounded-xl' style={{width:'200px', transform: 'translateX(50%)'}}>
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
                    </div>
                </Html>
            }
        </>
    );
}

const XRScene = () => {
    const reticleRef = useRef();
    const location = useLocation();
    const [models, setModels] = useState([]);

    const productData = location.state?.productData;
    const {isPresenting} = useXR();
    // console.log("Is presenting: ", isPresenting);

    // State to keep track of the position
    const [modelPosition, setModelPosition] = useState([0, 0, 0]);

    // Update model position whenever the reticle moves
    const updateModelPosition = (newPosition) => {
        setModelPosition(newPosition);
    };

    useHitTest((hitMatrix, hit) => {
        hitMatrix.decompose(
          reticleRef.current.position,
          reticleRef.current.quaternion,
          reticleRef.current.scale
        );
    
        reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
      });

    const placeModel = (e) => {
        let position = e.intersection.object.position.clone();
        let id = Date.now();
        console.log("Tap: ", position, id);
        setModels([{ position, id }]);
    };

    // // If you want to print all models' positions after adding the new one, you can do it in a useEffect hook
    // useEffect(() => {
    //     models.forEach((model, index) => {
    //         console.log(`Model ${index}: `, model.position, model.id);
    //     });
    // }, [models]); // This will run every time 'models' changes
    
    useFrame((state, delta) => {
        if(isPresenting){
            const scale = 1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.1;
            reticleRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <>
            <hemisphereLight groundColor="white" />
            <Environment preset="apartment" blur={0.8} background = {!isPresenting} />
            <OrbitControls />
            <CameraAdjuster />
            {!isPresenting && 
                <>
                    <Model {...{
                                productData: productData, 
                                isPresenting:isPresenting,
                                id:null,
                                position: null
                    }}/>
                </>
            }

            {isPresenting &&
                models.map(({ position, id }) => {
                    return (
                        <Model {...{
                            productData: productData, 
                            isPresenting:isPresenting,
                            id:id,
                            position: position
                        }}/>
                    );
            })}

            {isPresenting && 
                <Model productData={productData} isPresenting={isPresenting} />
            }

            {isPresenting &&
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[0.09, 0.205, 32]} />
                        <meshStandardMaterial color={"white"} opacity={0.5} transparent={true} />
                    </mesh>
                </Interactive>
            }
        </>
    )
}

export default XRScene