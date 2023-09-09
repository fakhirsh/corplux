import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'

function App() {

  return (
    <div className='bg-indigo-800 absolute w-full h-screen p-0 top-0 left-0'>
      <div className='h-5/6 p-0'>
        <Canvas
          camera={{ 
            position: [0, 0, 5],
            fov: 30,
          }}
        >
          <Experience />
        </Canvas>
        <div className='text-current text-5xl text-slate-300 italic font-light z-40 p-5'>
          Hello Vite + Tailwind + R3F!
        </div>
      </div>
    </div>
  )
}

export default App
