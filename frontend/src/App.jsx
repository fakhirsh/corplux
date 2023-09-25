import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'

function App() {

/*
Position: _Vector3 {x: -1.137768585447983, y: -0.2835070983595434, z: 1.6360301129911816} 
Rotation:  _Euler {isEuler: true, _x: -0.0040239456620568635, _y: -0.4830358088251831, _z: -0.0018690091101864709, 
*/


  return (
    <div className='bg-indigo-800 absolute w-full h-screen p-0 top-0 left-0'>
      <Canvas
        flat
        camera={{ 
          //position: [-1.137768585447983, -0.2835070983595434, 1.6360301129911816 ],
          //rotation: [-0.0040239456620568635, -0.4830358088251831, -0.0018690091101864709],
          //fov: 36,
          //lookAt: [-2.81447, 0.541734, 0.944357],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
