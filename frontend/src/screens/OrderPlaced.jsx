import { CheckCircleIcon, CheckIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import React from 'react'

const OrderPlaced = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='bg-green-100 p-10 m-10 border rounded-xl shadow flex flex-row items-center' style={{maxWidth:'700px',minWidth:"400px"}}>
            <CheckCircleIcon className='p-1 h-20 w-20 text-green-500'/>
            <h1>Order Placed</h1>
        </div>
        <h3 className='text-center'>Order no: 0f2112sd11f51f5f15f</h3>
        <h3 className='text-center'>Tracking no: 0f2112sd11f51f5f15f</h3>
        <div className='flex flex-col items-center mt-10'>
            <button className='bg-blue-400 p-4 m-4 rounded-lg shadow' style={{ width: '300px' }}>Continue Shopping</button>
            <button className='bg-blue-400 p-4 m-4 rounded-lg shadow' style={{ width: '300px' }}>Track Order</button>
            <button className='bg-blue-400 p-4 m-4 rounded-lg shadow' style={{ width: '300px' }}>Contact Support</button>
        </div>
    </div>
  )
}

export default OrderPlaced