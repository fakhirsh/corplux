import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, name, placeholder, required, value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-1 text-left">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border rounded" 
    />
  </div>
);

function Checkout() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col sm:flex-row p-8">
      {/* Left Column - User Data Input Fields */}
      <div className="p-4 w-full sm:w-2/3 rounded shadow mb-6 md:mb-0 md:ml-6">
        <h2 className="text-2xl mb-6">Shipping Details</h2>

        <InputField label="Full Name" name="fullName" placeholder="Full Name" required onChange={handleInputChange} value={userData.fullName}/>
        <InputField label="Email" name="email" placeholder="Email" required onChange={handleInputChange} value={userData.email}/>
        <InputField label="Phone Number" name="phoneNumber" placeholder="Phone Number" required onChange={handleInputChange} value={userData.phoneNumber}/>
        <InputField label="Address Line 1" name="address1" placeholder="Address Line 1" required onChange={handleInputChange} value={userData.address1}/>
        <InputField label="Address Line 2" name="address2" placeholder="Address Line 2" onChange={handleInputChange} value={userData.address2}/>
        <InputField label="City" name="city" placeholder="City" required onChange={handleInputChange} value={userData.city}/>
        <InputField label="State" name="state" placeholder="State" required onChange={handleInputChange} value={userData.state}/>
        <InputField label="Zip Code" name="zipCode" placeholder="Zip Code" onChange={handleInputChange} value={userData.zipCode}/>
        <InputField label="Country" name="country" placeholder="Country" required onChange={handleInputChange} value={userData.country}/>
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-full sm:w-1/3 p-4 sm:border-l rounded shadow mb-6 md:mb-0 md:ml-6">
        <h2 className="text-2xl mb-6">Order Summary</h2>
        <div className="mb-4">
          <span className="font-bold">Promo Code:</span> SAVE10 (-$10.00)
        </div>
        <div className="mb-4">
          <span className="font-bold">Items Total:</span> $100.00
        </div>
        <div className="mb-4">
          <span className="font-bold">Delivery Fee:</span> $10.00
        </div>
        <div className="mb-6">
          <span className="font-bold">Total Payment:</span> $110.00
        </div>

        <button 
          className="bg-blue-500 text-white px-8 py-2 rounded w-full font-bold"
          onClick={() => {
              console.log('Proceed to checkout');
              navigate("/order-placed");
          }}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default Checkout;
