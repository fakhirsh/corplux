import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'
import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react';
import Experience2 from './Experience2';

function Loader() {
    const { progress } = useProgress();
    const [showLoader, setShowLoader] = useState(true);
  
    useEffect(() => {
      if (progress === 100) {
        setTimeout(() => {
          setShowLoader(false);
        }, 500); // hide the loader half a second after 100% to ensure smooth transition
      }
    }, [progress]);
  
    if (!showLoader) return null;
  
    return (
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '10px',
          borderRadius: '4px',
        }}
      >
        Loading: {progress} %
      </div>
    )
  } 

export default function Home(){
    return(
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Canvas
                    flat
                    camera={{ 
                    fov: 70,
                    }}
                >
                    <Experience />
            </Canvas>
            <Loader />
        </div>
    );
}