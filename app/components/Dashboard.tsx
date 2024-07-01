"use client"

import React from 'react'
import connectMongoDB from '../../libs/mongodb'
import "./dashboard.css"
import AddProduct from './AddProduct';
import axios from 'axios';

function Dashboard() {
    const [showPopup, setShowPopup] = React.useState(false);
    const [typePopup, setTypePopup] = React.useState<String>("Add");
    const [productList, setProductList]=React.useState([])
    const [paramValue,setParamValue]=React.useState({})
    const togglePopup = (type:String) => {
      setShowPopup(!showPopup);
      setTypePopup(type)
    };

    React.useEffect(()=>{
        getAllProductsList()
    },[])

    const getAllProductsList=async()=>{
        axios({
            url: "http://localhost:3000/api/products",
            method: "GET",
        })
        .then((res)=>{
              console.log(res.data.data);
              setProductList(res.data.data)
           }).catch((err)=>{
              console.log(err);
            })
    }
const handleDelete=(item:any)=>{
    axios({
        url: `http://localhost:3000/api/products?id=${item._id}`,
        method: "DELETE",
    })
    .then((res)=>{
          console.log(res);
          getAllProductsList()
       }).catch((err)=>{
          console.log(err);
        })
}

  return (
   
<div>
<div className="flex justify-end ...">
  <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={()=>togglePopup("Add")}>ADD PRODUCT</button>
</div>
<div className="relative overflow-x-auto">

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                   Action
                </th>
            </tr>
        </thead>
        <tbody>
            {productList.map((item:any,i)=>(
 <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    {item.productName}
 </th>
 <td className="px-6 py-4">
 {item.color}
 </td>
 <td className="px-6 py-4">
 {item.category}
 </td>
 <td className="px-6 py-4">
 {item.price}
 </td>
 <td className="px-6 py-4">
    <div className='flex flex-row justify-start'>
    <button type="button" className="basis-1/4 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={()=>{togglePopup("Edit");setParamValue(item)}}>Edit</button>
    <button type="button" className="basis-1/4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>{handleDelete(item)}}>Delete</button></div>
 </td>
</tr>
            ))}
           
        </tbody>
    </table>
</div>
<AddProduct show={showPopup} onClose={togglePopup} type={typePopup} reload={getAllProductsList} paramValue={typePopup=='Edit'?paramValue:{}}/>
</div>

  )
}

export default Dashboard
