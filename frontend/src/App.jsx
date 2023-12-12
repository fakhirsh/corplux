import './App.css'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Navbar from './components/Navbar'
import { useProgress } from '@react-three/drei';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Contact from './screens/Contact';
import ProductList from './screens/ProductList';
import Details from './screens/Details';
import Checkout from './screens/Checkout';
import { RecoilRoot } from 'recoil';
import OrderPlaced from './screens/OrderPlaced';

// function Loader({isloading=true}) {
//   if (!isloading) return null;

//   const { active, progress, errors, item, loaded, total } = useProgress();

//   console.log("Progress: ", progress, "\nErrors: ", errors, "\nItem: ", item, "\nLoaded: ", loaded, "\nTotal: ", total)

//   return (
//       <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-white">
//           <p className="text-black text-2xl">Loading: {progress ? `${progress}%` : '0'}</p>
//       </div>
//   );
// }

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
        <Router>
            <RecoilRoot>
            <div className='absolute w-full h-screen p-0 pt-16 top-0 left-0'>

                    <Navbar />
                    <Routes>
                        <Route path="/corplux" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product-list" element={<ProductList />} />
                        <Route path="/details" element={<Details />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-placed" element={<OrderPlaced />} />
                    </Routes>
                </div>
            </RecoilRoot>
        </Router>
    );
}

export default App;
