import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'

export default function Home(){
    return(
        <Canvas
                flat
                camera={{ 
                fov: 36,
                }}
            >
                <Experience />
        </Canvas>
    );
}