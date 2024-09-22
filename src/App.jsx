
import { Redirect, Route, Switch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Product from './components/Product';
import ProductsDetail from './components/ProductsDetail';
import ProductForm from './components/ProductForm';
import { fetchProductsPagination } from './fetchProduct';

const App = () => {
  const [id, setId] = useState();
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([0])
  const limit = 20;

  const { isPending: productsLoading,
    error,
    data: { products, total } = { products: [], total: 0 }
  } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProductsPagination(page, limit)
  });

  useEffect(() => {
    setPages(Array.from(Array(parseInt(total / limit)).keys()))
  }, [total])

  const identifyHandler = (id) => {
    setId(id);
  }

  return (
    <div className=' w-[98vw] border-2 border-black border-solid'>
      <div>
        <h1 className='mx-px font-bold	'>Giyim</h1>
        {productsLoading && <p>...Loading</p>}
      </div>
      <div className='border-2 border-black border-solid' >
        <Switch>
          <Route path="/paginationRedirect">
            <Product productsLoading={productsLoading} identifyHandler={identifyHandler} page={page} setPage={setPage} pages={pages} products={products} />
          </Route>
          <Route path={`/ürün-detayları/${id}`} >
            <ProductsDetail id={id} />
          </Route>
          <Route path={`/ürün-güncelle/${id}`} >
            <ProductForm id={id} />
          </Route>
          <Route path="/" >
            <Redirect to="/paginationRedirect" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App

