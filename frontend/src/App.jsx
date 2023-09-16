import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'

function App() {

  return (
    <div className='bg-indigo-800 absolute w-full h-screen p-0 top-0 left-0'>
      <Canvas
        flat
        camera={{ 
          position: [0, 0.1, 2.5],
          fov: 70,
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default App
