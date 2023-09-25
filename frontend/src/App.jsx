import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'

function App() {


  /*
  Position:  
    x: -0.5763754905804962, 
    -0.38282324342312785, 
    1.249279955928787

  Rotation:  
    isEuler: true, 
    _x: 0.01920760670291659, 
    _y: -0.31541408186142517, 
    _z: 0.005959056917360834, 
    _order: 'XYZ'
  */


  return (
    <div className='bg-indigo-800 absolute w-full h-screen p-0 top-0 left-0'>
      <Canvas
        flat
        camera={{ 
          //position: [3.34485 , 0.689949 , 1.04566 ],
          fov: 36,
          //lookAt: [-2.81447, 0.541734, 0.944357],
        }}
      >
        <Experience />
      </Canvas>

      {/* <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer> */}
    </div>
  )
}

export default App
