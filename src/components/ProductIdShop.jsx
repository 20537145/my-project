// ProductIdShop.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/productId";


const ProductIdShop = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const selectedProduct = useSelector((state) => state.productId.selectedProduct);
  const status = useSelector((state) => state.productId.status);
  const error = useSelector((state) => state.productId.error);

  console.log("Selected product:", selectedProduct);
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  // Loading state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Error state
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Check if selectedProduct is undefined
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  // Display product details
  return (
    <div >
      <section >
        <div className="shop-container">
        <img
          src={`https://h-royal-backned.onrender.com/uploads/${selectedProduct.image}`}
          alt={selectedProduct.name}
        />
        <div className="product-details allofit">
          <h2 className="product-name ">{selectedProduct.name}</h2>
          <p className="price">{selectedProduct.price} DT</p>
          <p className={selectedProduct.Availability ? "in-stock" : "out-of-stock"}>
            {selectedProduct.Availability ? "En stock" : "Hors stock"}
          </p>
          <hr className="hr"/>
          <p>{selectedProduct.description}</p>
          <div className="product-quantity">
            <button>-</button>
            <span></span>
            <button>+</button>
          </div>
          <button className="button shop">
            Ajouter au panier
          </button>
          <hr />
        </div>
        </div>
      </section>
    </div>
  );
};

export default ProductIdShop;
