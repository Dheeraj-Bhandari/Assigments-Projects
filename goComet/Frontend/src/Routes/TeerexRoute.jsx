import React from 'react'
import { Routes, Route } from 'react-router'
import Cart from '../components/Cart'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import ProductListing from '../components/ProductListing'
import SingleProduct from '../components/SingleProduct'

const TeerexRoute = () => {
  return (
    <>
    <Routes>
        <Route path="/cart" element={<><NavBar/>, <Cart/></>} />
        <Route path="/" element={<><NavBar/>, <HomePage/></>} />
        <Route path="/products" element={<><NavBar/>, <ProductListing/></>} />
        <Route path="/products/:id" element={<><SingleProduct/></>} />
        
    </Routes>
    </>
  )
}

export default TeerexRoute