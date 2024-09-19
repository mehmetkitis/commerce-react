import axios from "axios";

export const fetchProducts = () =>
    axios
        .get("https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/products")
        .then((res) => res.data)

export const fetchProductsPagination = (page, limit) => {
    const offset = page * limit;
    return axios
        .get("https://workintech-fe-ecommerce.onrender.com/products", {
            params: { offset, limit },
        })
        .then((res) => res.data)
}

