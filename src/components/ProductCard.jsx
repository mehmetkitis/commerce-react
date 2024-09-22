import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductCard = ({ product, identifyHandler }) => {
    const identify = product.id
    return (
        <div className='w-[17vw] ml-1 border-2 border-slate-50 border-solid hover:scale-110 duration-500 rounded' >
            <img className='h-1/2 w-full' src={product?.images[0].url} />
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>{product?.price}</p>
            <p>Stok: {product?.stock}</p>
            <NavLink className="mr-1 text-blue-600" onClick={() => { identifyHandler(identify) }} to={`/ürün-detayları/${identify}`}>İncele</NavLink>
            <NavLink className=" text-blue-600" onClick={() => { identifyHandler(identify) }} to={`/ürün-güncelle/${identify}`}>Güncelle</NavLink>
        </div>
    )
}

export default ProductCard