import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getDetails();
    },[])
    const getDetails=async () => {
        let result= await fetch(`http://localhost:5000/product/${params.id}`);
        result= await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const handleClick = async ()=>{
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result= await result.json();
        navigate('/');
    }
    
  return (
    <div className="register">
      <h1>Update Product</h1>
      <input type="text" className="inputBox" 
      value={name} placeholder='Enter Product Name' onChange={(e)=>setName(e.target.value)}/>
     

      <input type="text" className="inputBox" 
      value={price} placeholder='Enter Product Price' onChange={(e)=>setPrice(e.target.value)}/>

      <input type="text" className="inputBox" 
      value={category} placeholder='Enter Product Category' onChange={(e)=>setCategory(e.target.value)}/>

      <input type="text" className="inputBox" 
      value={company} placeholder='Enter Product Company' onChange={(e)=>setCompany(e.target.value)}/>

      <button type="button" className="boxButton" onClick={handleClick}>Update Product</button>
    </div>
  )
}

export default UpdateProduct

