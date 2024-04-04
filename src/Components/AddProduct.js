import React, { useState } from 'react'

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const handleClick=async () => {
        console.log(name,price,category,company);
        if(!name || !price || !category || !company){
            setError(true)
            return false
        }

        const userId=JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",
            { method: 'POST',
                body: JSON.stringify({name,price,category,company,userId}),
                headers: {'Content-Type': 'application/json'}
            }
        )
            result=await result.json();
            console.log(result);
        }
    
  return (
    <div className="register">
      <h1>Add Product</h1>
      <input type="text" className="inputBox" 
      value={name} placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)}/>
      {error && !name && <span className="invalid-input">Enter valid name</span>}

      <input type="text" className="inputBox" 
      value={price} placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)}/>
      {error && !price && <span className="invalid-input">Enter valid price</span>}

      <input type="text" className="inputBox" 
      value={category} placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)}/>
      {error && !category && <span className="invalid-input">Enter valid category</span>}

      <input type="text" className="inputBox" 
      value={company} placeholder='Enter Product Company' onChange={(e)=>setCompany(e.target.value)}/>
      {error && !company && <span className="invalid-input">Enter valid company</span>}

      <button type="button" className="boxButton" onClick={handleClick}>AddProduct</button>
    </div>
  )
}

export default AddProduct
