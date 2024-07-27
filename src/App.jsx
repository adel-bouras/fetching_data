import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
const [product , setProduct] = useState([]);
const [error , setError] = useState(null);
const [fetch , setFetch] = useState(false);
const [numberOfProduct , setNumberOfProduct] = useState(1);

function products(){
  setNumberOfProduct(numberOfProduct+1);
}

function bring(){
  setFetch(!fetch);
}

useEffect(()=>{
  const fetchData = async ()=>{
    try{
      const response = await axios.get(`https://fakestoreapi.com/products?limit=${numberOfProduct}`);
      setProduct(response.data);
      console.log(product);
    }catch(e){
      setError(e.message);
      console.log(error);
    }

  }

fetchData();
},[fetch , numberOfProduct]);

  return (
    <div id="container">
      <div id="but">
      <button onClick={bring} ><h1>bring data</h1></button>
      <button onClick={products} ><h1>Number is {numberOfProduct}</h1></button>
      </div>
      <div id="product">
        {
          product.map((element , index)=>(
            <div key={index} className="prod">
                <img src={element.image} alt="product" />
                <h2>{element.category}</h2>
                <p>{element.description}</p>
                <h3 style={{color : 'green'}} >{element.price} DA</h3>
                <button style={{backgroundColor : 'orange',border : 'none',cursor : 'pointer'}}>See nore</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
