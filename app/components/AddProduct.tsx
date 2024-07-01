import React from 'react'
import axios from 'axios'

function AddProduct({ show, onClose , type, reload, paramValue}:any ) {
    
var initialValues={
    productName:'',
    color:'',
    category:'',
    price:''
}
const[formValues, setFormValues]=React.useState<any>(initialValues)

React.useEffect(()=>{
if(type=='Edit'){
  setFormValues({
    productName:type=='Edit'?paramValue.productName :'',
    color:type=='Edit'?paramValue.color :'',
    category:type=='Edit'?paramValue.category :'',
    price:type=='Edit'?paramValue.price :''
})
}
},[type])

const handleChange=(e:any)=>{
    setFormValues({...formValues,[e.target.name]:e.target.value})
}

const handleSave=async()=>{
  let payload={
  productName: formValues.productName, 
  color: formValues.color, 
  price: formValues.price, 
  category: formValues.category 
  }
  console.log(payload,'payload');
  if(type=='Edit'){
    axios({
      url: `http://localhost:3000/api/products/${paramValue._id}`,
      method: "PUT",
      data: payload,
  })
  .then((res)=>{
        console.log(res);
        reload();
        onClose();
        setFormValues(initialValues);
     }).catch((err)=>{
        console.log(err);
      })
  }
  else{
    axios({
      url: "http://localhost:3000/api/products",
      method: "POST",
      data: payload,
  })
  .then((res)=>{
        console.log(res);
        reload();
        onClose();
        setFormValues(initialValues);
     }).catch((err)=>{
        console.log(err);
      })
  }

}

if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded shadow-md">
    <h2 className="text-xl mb-4">{type} Product</h2>
     <form>
       <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
             <div className="sm:col-span-3">
               <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
               Product name
               </label>
               <div className="mt-2">
                 <input
                  type="text"
                  value={formValues.productName}
                  name="productName"
                  id="productName"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="color" className="block text-sm font-medium leading-6 text-gray-900">
              Color
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={formValues.color}
                  name="color"
                  id="color"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
              Category
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={formValues.category}
                  name="category"
                  id="category"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Price
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={formValues.price}
                  name="price"
                  id="price"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </form>
      <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900"  onClick={()=>onClose("Edit")}>
        Cancel
      </button>
      <button
        type="submit"
        onClick={handleSave}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
    </div>
  </div>
  )
}

export default AddProduct
