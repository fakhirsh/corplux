import { useLocation } from "react-router-dom";

function Cart() {
    const location = useLocation();
    const items = location.state.cartItems;

   // Sample data for the order summary
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const promoDiscount = 0; // Let's assume no discount for this example
    const grandTotal = subtotal - promoDiscount;
  
    return (
      <div className="flex p-6 bg-gray-100">
        {/* Left Column */}
        <div className="w-2/3 pr-6">
          {items.map((item) => (
            <div key={item.id} className="flex mb-4 bg-white p-4 rounded shadow">
              {/* Product Image */}
              <img src={item.image} alt={item.name} className="w-1/4 object-cover rounded" />
  
              {/* Product Title & Description */}
              <div className="w-1/2 px-4">
                <h2 className="text-xl">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
  
              {/* Product Price & Quantity */}
              <div className="w-1/4 text-right">
                <p className="text-red-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button className="border px-2 py-1">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="border px-2 py-1">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Right Column */}
        <div className="w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-2xl mb-4">Order Summary</h2>
          <div className="mb-4">
            <span className="text-gray-600">Subtotal:</span> ${subtotal.toFixed(2)}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Promo code"
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <span className="text-gray-600">Discount:</span> -${promoDiscount.toFixed(2)}
          </div>
          <div className="mb-6">
            <span className="text-xl text-gray-700">Total:</span> ${grandTotal.toFixed(2)}
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded">Proceed to Checkout</button>
        </div>
      </div>
    );
  }
  
  export default Cart;
  