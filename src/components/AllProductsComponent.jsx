
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/AllProducts";
import { useNavigate } from "react-router-dom";

const AllProductsComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsList.products);
  console.log(products.Availability)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  const handleClick = (productId) => {

    // Make sure the route parameter name matches the one in your route definition
    navigate(`/products/${productId}`);
  };
  return (
    <div className="product-cont">
  <section className="products-section">
    {products.map((product) => (
      product.price > 0 ? (
        <div className="product-card" key={product._id} onClick={() => handleClick(product._id)}>
          <img src={`https://h-royal-backned.onrender.com/uploads/${product.image}`} alt={` ${product.name}`} />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="price">{product.price} DT</p>
            <p className={product.availability ? 'in-stock' : 'out-of-stock'}>
              {product.availability ? 'En stock' : 'Hors stock'}
            </p>
          </div>
        </div>
      ) : (
        <div key={product._id} style={{ display: 'none' }}></div>
      )
    ))}
  </section>
</div>

  );
};

export default AllProductsComponent;
