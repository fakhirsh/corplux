import { Center, Environment, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture, Text, Text3D, useMatcapTexture, Outlines } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000'),
    },
    portalVertexShader,
    portalFragmentShader
)
extend({ PortalMaterial });

export default function Experience() {

    const {nodes} = useGLTF('./portal.glb');
    const [axeSelected, setAxeSelected] = useState(false);
    const matcapTexture = useMatcapTexture('E6BF3C_5A4719_977726_FCFC82', 256);

    const bakedTexture = useTexture('./baked.jpg');
    bakedTexture.flipY = false;

    const portalMaterial = useRef();

    useFrame((_, dt) => {
        portalMaterial.current.uniforms.uTime.value += dt;
    });

    return( 
        <>
            <color attach='background' args={['#030202']} />
            {/* <Perf position="top-left" /> */}
            
            <Text3D
                    font="./font1.json"
                    size={0.75}
                    height={0.2}
                    position={[-1.8, 3, -4]}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.03}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Corplux
                    {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
                    <meshNormalMaterial />
                </Text3D>

            <OrbitControls 
                makeDefault
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 4}  // radians
                maxPolarAngle={Math.PI / 1.8}  // radians
            >
                {/* <perspectiveCamera position={[0, -2, 1]} /> */}
            </OrbitControls>
            <Center>
                <mesh 
                    geometry={nodes.baked.geometry}
                    scale={[2, 2, 2]}
                >    
                    <meshBasicMaterial map={bakedTexture} />
                </mesh>
                <mesh 
                    geometry={nodes.poleLightA.geometry} 
                    rotation={nodes.poleLightA.rotation}
                    position={nodes.poleLightA.position}
                    
                />
                <mesh 
                    geometry={nodes.poleLightB.geometry}
                    rotation={nodes.poleLightB.rotation}
                    position={nodes.poleLightB.position}
                
                />
                <mesh 
                    geometry={nodes.portalLight.geometry} 
                    rotation={nodes.portalLight.rotation}
                    position={nodes.portalLight.position}
                >
                    <portalMaterial ref={portalMaterial}/>
                </mesh>
                <mesh 
                    geometry={nodes.axe.geometry}
                    rotation={nodes.axe.rotation}
                    position={nodes.axe.position}
                    onPointerOver={() => setAxeSelected(true)}
                    onPointerOut={() => setAxeSelected(false)}
                >
                    <meshBasicMaterial map={bakedTexture} />
                    {axeSelected && (
                        <Outlines thickness={0.01} color="orange" />
                    )}
                </mesh>
                {axeSelected && (
                    < TextWithBackground position={nodes.axe.position} />
                )}
                
                

                <Sparkles 
                    size={6}
                    scale={[4,2,4]}
                    position-y = {1}
                    speed={0.2}
                    count={40}
                />
            </Center>
            {/* <Environment 
                background
                preset="night" 
            /> */}

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