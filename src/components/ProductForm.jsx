import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { queryClient } from '../main';

const initialFormData = {
    name: "",
    description: "",
    stock: 0,
    price: 0,
}

const ProductForm = ({ id }) => {
    const [formData, setFormData] = useState(initialFormData);
    const history = useHistory();
    const [product, setProduct] = useState("")

    useEffect(() => {
        axios
            .get("https://workintech-fe-ecommerce.onrender.com/products/" + id)
            .then((res) => setProduct(res.data))
    }, [id])

    const inputChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const mutation = useMutation({
        mutationFn: (formData) =>
            axios
                .put("https://workintech-fe-ecommerce.onrender.com/products/" + id, formData)
                .then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            history.push("/paginationRedirect");
        }
    })

    const submitHandler = (e) => {
        e.preventDefault();
        mutation.mutate(formData)
    }
    return (
        <div className='flex '>
            <form onSubmit={submitHandler}>
                <div className='m-2 '>
                    <label htmlFor='name'>Name
                        <input className='border-2 border-black border-solid ml-12 pr-1' type="text" name='name' value={formData.name} onChange={inputChangeHandler} />
                    </label>
                </div>
                <hr />
                <div className='m-2'>
                    <label htmlFor='description'>Description
                        <textarea className='border-2 border-black border-solid ml-3 pr-4 pl-1' name='description' value={formData.description} onChange={inputChangeHandler} />
                    </label>
                </div>
                <hr />
                <div className='m-2'>
                    <label htmlFor='stock'>Stock
                        <input className='border-2 border-black border-solid ml-14' type="number" name='stock' value={formData.stock} onChange={inputChangeHandler} />
                    </label>
                </div>
                <hr />
                <div className='m-2'>
                    <label htmlFor='price'>Price
                        <input className='border-2 border-black border-solid ml-14 pr-1' type="number" name='price' value={formData.number} onChange={inputChangeHandler} />
                    </label>
                </div>
                <hr />
                <div className='flex m-2 gap-1'>
                    <button type="submit" className='border-2 p-1 px-3 rounded-xl m-2 font-bold border-yellow-50 border-solid bg-yellow-300 rounded' >Güncelle</button>
                    <button className='border-2 p-1 px-3 rounded-xl m-2 font-bold border-yellow-50 border-solid bg-yellow-300 rounded' onClick={() => { history.push("/paginationRedirect") }}>Geri</button>
                </div>
            </form>
            <div >
                <img className='h-[15vw] ml-2' src={product?.images?.[0]?.url} />
            </div>
        </div>
    )
}

export default ProductForm
