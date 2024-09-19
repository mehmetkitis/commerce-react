import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProductsDetail = ({ id }) => {
    const [product, setProduct] = useState({});
    const history = useHistory()

    useEffect(() => {
        axios
            .get("https://workintech-fe-ecommerce.onrender.com/products/" + id
            )
            .then(res => setProduct(res.data))
    }, [id])

    return (
        <div>
            <h1>Detail: {product?.name}</h1>
            <hr />
            <img className='h-[33vw]' src={product?.images?.[0]?.url} />
            <p>{product?.description}</p>
            <p>{product?.price}TL</p>
            <button onClick={() => { history.push("/paginationRedirect") }}>Geri</button>
        </div>
    )
}

export default ProductsDetail