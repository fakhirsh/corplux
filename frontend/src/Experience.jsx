import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";


export default function Experience() {
    const [spin, setSpin] = useState(0.0)

    useFrame((_, delta) => {
      setSpin((spin) => spin + delta*0.75);
    });

    return( 
        <>
            <color attach='background' args={['#ececec']} />
            <OrbitControls />
            <mesh
                rotation={[spin,spin,spin]}
            >
            <torusGeometry />
            <meshNormalMaterial />
            </mesh>
        </>
    );
};