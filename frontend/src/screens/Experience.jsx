import { Center, Environment, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture, Text, Text3D, useMatcapTexture, Outlines, Sky, useVideoTexture, Float, PresentationControls } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { useSpring, animated } from "react-spring";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CameraAdjuster from "../components/CameraAdjuster";

// const LAPTOP_FOV = 36;  // Replace 50 with your desired landscape FOV value
// const MOBILE_FOV = 70;

export default function Experience() {
    const navigate = useNavigate();

    const {nodes} = useGLTF('./corplux_stage.glb');
    //console.log(nodes);
    const stageDiffuse = useTexture('./stage_diffuse.jpg');
    stageDiffuse.flipY = false;

    const mesh1 = useGLTF('./interactables.glb');
    // console.log(mesh1.nodes);

    const videoTexture = useVideoTexture("/ad.mp4")
    // console.log(videoTexture);

    const productButtonClick = () => {
        document.body.style.cursor = 'default';
        navigate("/product-list");
    }

    // const {pos_x, pos_y, pos_z, rot_x, rot_y, rot_z, s_x, s_y, s_z, sunPosition} = useControls({
    //     pos_x: { value: 0, min: -10, max: 10, step: 0.01 },
    //     pos_y: { value: 0, min: -10, max: 10, step: 0.01 },
    //     pos_z: { value: 0, min: -10, max: 10, step: 0.01 },
    //     rot_x: { value: 0, min: -10, max: 10, step: 0.01 },
    //     rot_y: { value: 0, min: -10, max: 10, step: 0.01 },
    //     rot_z: { value: 0, min: -10, max: 10, step: 0.01 },
    //     s_x: { value: 1, min: -10, max: 10, step: 0.01 },
    //     s_y: { value: 1, min: -10, max: 10, step: 0.01 },
    //     s_z: { value: 1, min: -10, max: 10, step: 0.01 },
    //     sunPosition: { value: [ 1, 2, 3 ] },
    // });

    // console.log("Position: ", pos_x, pos_y, pos_z, "\nRotation: ", rot_x, rot_y, rot_z, "\nScale: ", s_x, s_y, s_z, "\nSun Position: ", sunPosition);

/*
, y: , z: } 
Rotation:  _Euler {isEuler: true, _x: -0.029723520944287127, _y: -0.5602254619358139, _z: -0.0157977402701478
*/

    const { camera } = useThree();
        useEffect(() => {
            camera.position.set(-1.112505147567413, -0.34148052724047506, 1.9676561805147699);
            camera.quaternion.set(0.02293597168506244, -0.2156830279090632, 0.005067605779075498, 0.9761808705596049)
            camera.updateProjectionMatrix();  // Update the camera's projection matrix after changing position
        }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         if (window.innerHeight > window.innerWidth) {
    //             // It's portrait
    //             camera.fov = MOBILE_FOV; // e.g., 75 or whatever works for your scene
    //         } else {
    //             // It's landscape
    //             camera.fov = LAPTOP_FOV; // e.g., 50
    //         }
    //         camera.aspect = window.innerWidth / window.innerHeight;
    //         camera.updateProjectionMatrix();
    //     };
    
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, [camera]);
    
    
    // useEffect(() => {
    //     function logCameraPosition() {
    //         console.log("Position:", camera.position, "\nRotation: ", camera.rotation);
    //         requestAnimationFrame(logCameraPosition);
    //     }
        
    //     logCameraPosition();0

    //     // Cleanup function to stop logging when component is unmounted
    //     return () => cancelAnimationFrame(logCameraPosition);
    // }, [camera]);
    // console.log(camera);

     
    const [hovered, setHovered] = useState(false);

    const btnZPos = 1.62;
    const textPos = useState([-0.74, -0.28, 1.62]);

    const btnAnimProps = useSpring({
        z: hovered ? btnZPos+0.5 : btnZPos
    });

    //console.log(btnPos);
    // console.log(btnAnimProps.z.get());

    // useFrame(() => {
    //     console.log(camera);
    //   },[]);

    return( 
        <>
            <color attach='background' args={['#030202']} />
            {/* <Perf position="top-left" /> */}
            
            {/* <OrbitControls 
                makeDefault 
                enabled={false}
            >
            </OrbitControls> */}
            <CameraAdjuster />
            <Float
                speed={0.3} // Animation speed, defaults to 1
                rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            >
                <Center>
                    <mesh geometry={nodes.stage.geometry}>
                        <meshStandardMaterial map={stageDiffuse}/>
                    </mesh>
                    <mesh 
                        geometry={mesh1.nodes.tv_screen.geometry}
                        position={[-1.73, 1.13, 0.16]}
                        rotation={[-1.58, 0.01, -1.57]}
                        scale={[0.17, 1.05, 0.33]}
                    >
                        <meshBasicMaterial map={videoTexture} toneMapped={false} />
                    </mesh>
                    <mesh 
                        geometry={mesh1.nodes.btn_base.geometry}
                        //position={[-0.74, -0.28, 1.62]}
                        position={[-0.74, -0.28, btnZPos]}
                        rotation={[0, -1.57, 0 ]}
                        scale={[0.6, 0.6, 0.6]}
                        onClick={(e) => {
                            // Handle click event
                            // console.log('Clicked on btn_base!');
                            // console.log("Camera Position:", camera.position);
                            // console.log("Camera Quaternion:", camera.quaternion);
                            productButtonClick();
                        }}
                        onPointerOver={(e) => {
                            // Handle hover over event
                            console.log('Mouse over btn_base');
                            document.body.style.cursor = 'pointer';
                            if (e.eventObject === mesh1.nodes.btn_base) {
                                setHovered(true);
                                
                            }
                        }}
                        onPointerOut={(e) => {
                            // Handle hover out event
                            console.log('Mouse out of btn_base');
                            document.body.style.cursor = 'default';
                        }}
                    >
                        <meshStandardMaterial color="red"/>
                    </mesh>
                    <mesh 
                        geometry={mesh1.nodes.btn_text.geometry}
                        position={[-0.74, -0.28, 1.62]}
                        rotation={[0, -1.57, 0 ]}
                        scale={[0.6, 0.6, 0.6]}
                    >
                        <meshStandardMaterial color="white"/>
                    </mesh>
                </Center>
            </Float>
            
            <Environment 
                background
                preset="apartment"
            />
            <Sky sunPosition={ [4,2,3] } />

            <EffectComposer>
                {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
                <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.01} darkness={0.9} />
            </EffectComposer>

        </>
    );
};

// function TextWithBackground({ position }) {
//     const [x, y, z] = position;
//     console.log(x, y, z); // This should now log the x, y, and z coordinates
  
//     return (
//       <>
//         <mesh position={[x, y+0.25, z]}>
//           <Text 
//             fontSize={0.2} 
//             color="#ffffff"
//           >
//             Axe
//           </Text>
//         </mesh>
//         <mesh position={[x,y+0.27,z - 0.01]} /* slightly behind the text */>
//         <planeGeometry args={[0.5, 0.2]} />
//         <meshBasicMaterial color="#000000" transparent opacity={0.7} />
//       </mesh>

//       </>
//     );
//   }