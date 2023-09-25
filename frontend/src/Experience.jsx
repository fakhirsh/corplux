import { Center, Environment, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture, Text, Text3D, useMatcapTexture, Outlines, Sky } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export default function Experience() {

    const {nodes} = useGLTF('./corplux_stage.glb');
    //console.log(nodes);
    const stageDiffuse = useTexture('./stage_diffuse.jpg');
    stageDiffuse.flipY = false;

    const mesh1 = useGLTF('./interactables.glb');
    console.log(mesh1.nodes);

    const { camera } = useThree();

    const {pos_x, pos_y, pos_z, rot_x, rot_y, rot_z, scale, sunPosition} = useControls({
        pos_x: { value: 0, min: -10, max: 10, step: 0.01 },
        pos_y: { value: 0, min: -10, max: 10, step: 0.01 },
        pos_z: { value: 0, min: -10, max: 10, step: 0.01 },
        rot_x: { value: 0, min: -10, max: 10, step: 0.01 },
        rot_y: { value: 0, min: -10, max: 10, step: 0.01 },
        rot_z: { value: 0, min: -10, max: 10, step: 0.01 },
        scale: { value: 1, min: -10, max: 10, step: 0.01 },
        sunPosition: { value: [ 1, 2, 3 ] },
    });

    console.log("Position: ", pos_x, pos_y, pos_z, "\nRotation: ", rot_x, rot_y, rot_z, "\nScale: ", scale);

    // useFrame(() => {
    //     console.log(camera);
    //   },[]);

    return( 
        <>
            <color attach='background' args={['#030202']} />
            <Perf position="top-left" />
            
            <OrbitControls makeDefault >
            </OrbitControls>

            <Center>
                <mesh geometry={nodes.stage.geometry}>
                    <meshStandardMaterial map={stageDiffuse}/>
                </mesh>
                <mesh 
                    geometry={mesh1.nodes.tv_screen.geometry}
                    position={[-0.68, -0.24, 1.53]}
                    rotation={[0, -1.57, 0 ]}
                    scale={[0.58, 0.58, 0.58]}
                >
                    <meshBasicMaterial />
                </mesh>
                <mesh 
                    geometry={mesh1.nodes.btn_base.geometry}
                    position={[-0.74, -0.28, 1.62]}
                    rotation={[0, -1.57, 0 ]}
                    scale={[0.6, 0.6, 0.6]}
                    onClick={(e) => {
                        // Handle click event
                        console.log('Clicked on btn_base!');
                    }}
                    onPointerOver={(e) => {
                        // Handle hover over event
                        console.log('Mouse over btn_base');
                    }}
                    onPointerOut={(e) => {
                        // Handle hover out event
                        console.log('Mouse out of btn_base');
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
            <Environment 
                background
                preset="apartment"
            />
            <Sky sunPosition={ sunPosition } />

            <EffectComposer>
                {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
                <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
                <Noise opacity={0.04} />
                <Vignette eskil={false} offset={0.01} darkness={0.9} />
            </EffectComposer>

        </>
    );
};

function TextWithBackground({ position }) {
    const [x, y, z] = position;
    console.log(x, y, z); // This should now log the x, y, and z coordinates
  
    return (
      <>
        <mesh position={[x, y+0.25, z]}>
          <Text 
            fontSize={0.2} 
            color="#ffffff"
          >
            Axe
          </Text>
        </mesh>
        <mesh position={[x,y+0.27,z - 0.01]} /* slightly behind the text */>
        <planeGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
      </mesh>

      </>
    );
  }