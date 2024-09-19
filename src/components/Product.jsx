import ProductCard from './ProductCard'

const Product = ({ productsLoading, products, identifyHandler, page, setPage, pages }) => {



    return (
        <>
            <div className='flex ' >
                <div className='w-[10vw]'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam harum saepe numquam quisquam, animi sed illum perspiciatis cumque similique excepturi assumenda. Quaerat mollitia, sapiente reprehenderit maiores ratione porro laborum ut.</p>
                </div>
                <div className='flex w-[90vw] m-0 gap-1 flex-wrap justify-start '>
                    {products?.map((product, index) => {
                        return (
                            <ProductCard product={product} key={index} identifyHandler={identifyHandler} />
                        )
                    })}
                </div>
            </div>
            <div >
                {pages.map((p, index) => {
                    return (
                        <button className='' onClick={(e) => setPage(e.target.value)} key={index} value={p}>{p + 1}</button>
                    )
                })}
            </div>
        </>

    )
}

export default Product
