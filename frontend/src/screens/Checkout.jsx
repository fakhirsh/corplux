import React, { useState } from 'react';

function Checkout() {
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

  const InputField = ({ label, name, placeholder, required }) => (
    <div className="mb-4">
      <label className="block mb-1 text-left">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type="text" 
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        required={required}
        className="w-full p-2 border rounded" 
      />
    </div>
  );

  return (
    <div className="flex p-8">
      {/* Left Column - User Data Input Fields */}
      <div className="w-2/3 pr-4">
        <h2 className="text-2xl mb-6">Shipping Details</h2>

        <InputField label="Full Name" name="fullName" placeholder="Full Name" required />
        <InputField label="Email" name="email" placeholder="Email" required />
        <InputField label="Phone Number" name="phoneNumber" placeholder="Phone Number" required />
        <InputField label="Address Line 1" name="address1" placeholder="Address Line 1" required />
        <InputField label="Address Line 2" name="address2" placeholder="Address Line 2" />
        <InputField label="City" name="city" placeholder="City" required />
        <InputField label="State" name="state" placeholder="State" required />
        <InputField label="Zip Code" name="zipCode" placeholder="Zip Code" />
        <InputField label="Country" name="country" placeholder="Country" required />
      </div>

      {/* Right Column - Order Summary */}
      <div className="w-1/3 pl-4 border-l">
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

        <button className="bg-blue-500 text-white px-8 py-2 rounded-full w-full font-bold">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default Checkout;
