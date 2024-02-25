import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/productId"; 


const ProductIdShop = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const selectedProduct = useSelector((state) => state.productId.selectedProduct);
  const status = useSelector((state) => state.productId.status);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const error = useSelector((state) => state.productId.error);

  const addToCart = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const userData = storedUser || {};
    const existingCartItems = userData.cart || [];
  
    const isProductInCart = existingCartItems.some(
      (item) => item._id === selectedProduct._id
    );
  
    if (!isProductInCart && isAuth === true) {
      const updatedCartItems = [...existingCartItems, selectedProduct];
      const updatedUser = { ...userData, cart: updatedCartItems };
  
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("Product added to cart:", selectedProduct);
    } else {
      console.log("Product already exists in the cart");
    }
  };
  
  
  
  

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }


  return (
    <div>
      <section>
        <div className="shop-container">
          <img
            src={`http://localhost:6010/uploads/${selectedProduct.image}`}
            alt={selectedProduct.name}
          />
          <div className="product-details allofit">
            <h2 className="product-name">{selectedProduct.name}</h2>
            <p className="price">{selectedProduct.price} DT</p>
            <p
              className={
                selectedProduct.Availability ? "in-stock" : "out-of-stock"
              }
            >
              {selectedProduct.Availability ? "En stock" : "Hors stock"}
            </p>
            <hr className="hr" />
            <p>{selectedProduct.description}</p>
            <div className="product-quantity">
              <button>-</button>
              <span></span>
              <button>+</button>
            </div>
            <button className="button shop" onClick={addToCart}>
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
