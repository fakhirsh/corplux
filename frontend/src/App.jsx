import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import Experience from './Experience'
import Navbar from './components/Navbar'
import { useProgress } from '@react-three/drei';

function Loader({isloading=true}) {
  if (!isloading) return null;

  const { active, progress, errors, item, loaded, total } = useProgress();

  console.log("Progress: ", progress, "\nErrors: ", errors, "\nItem: ", item, "\nLoaded: ", loaded, "\nTotal: ", total)

  return (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-white">
          <p className="text-black text-2xl">Loading: {progress ? `${progress}%` : '0'}</p>
      </div>
  );
}

// function Loader() {
//   const { active, progress, errors, item, loaded, total } = useProgress();

//   return (
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//       <div className="text-white">Loading: {Math.round(progress)}%</div>
//     </div>
//   );
// }


function App() {

  return (
    <div className='bg-indigo-800 absolute w-full h-screen p-0 top-0 left-0'>
      {/* <Loader/> */}
      {/* <Loader /> */}
      <Navbar />
      
      <Canvas
        flat
        camera={{ 
          fov: 36,
        }}
      >
        <Experience />
      </Canvas>
      {/* <Loader/> */}
    </div>
  )
}

export default App
