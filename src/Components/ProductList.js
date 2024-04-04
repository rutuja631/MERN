import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProduct]=useState([]);
    useEffect(() =>{
        getProducts();

    },[])
    const getProducts=async()=>{
        let result= await fetch("http://localhost:5000/products",{
        headers:{
          authorization: JSON.parse(localStorage.getItem('token'))
        }})
        result=await result.json();
        setProduct(result);
    }
    const handleDelete=async(id)=>{
      let result= await fetch(`http://localhost:5000/product/${id}`,{
        method: 'DELETE'
      });
      result=await result.json();
      console.log(result);
      if(result){
        alert("Record is deleted")
        getProducts();
      }
      getProducts();
    }

    const handleSearch=async(event)=>{
      let key = event.target.value;
      let result= await fetch(`http://localhost:5000/search/${key}`);
      if(key){
        result=await result.json(); 
        setProduct(result);
      }
      else{
        getProducts();
      }
    }
    console.log('products:', products);
  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <input type="text" placeholder="Search Product" className="search-product-box" onChange={handleSearch}/>
      <ul>
        <li>Sr. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>company</li>
        <li>Operation</li>
      </ul>
      {products.length>0? products.map((item, index)=>
        <ul key={index}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button onClick={()=>handleDelete(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link></li>
        </ul>
      )
    :<h2>No Result Found</h2>}
    </div>
  )
}

export default ProductList
