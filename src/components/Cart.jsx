import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  // Retrieve cart items from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userCart = storedUser.cart || [];

  console.log("Stored Cart Items:", userCart);

  setCartItems(userCart);
}, []);

  const removeFromCart = (index) => {
    // Ensure that cartItems is an array before updating
    if (Array.isArray(cartItems)) {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);

      localStorage.setItem("user", JSON.stringify(updatedCartItems));

      setCartItems(updatedCartItems);
    } else {
      console.error("Invalid cartItems structure:", cartItems);
    }
  };

  return (
    <div className="container my-5">
      <h2>Your Cart Items:</h2>
      <section>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div className="cart-container" key={index}>
              <img
                src={`http://localhost:6010/uploads/${item.image}`}
                alt={item.name}
              />
              <div className="cart-info">
                <p>Name: {item.name}</p>
                <p>Price: {item.price} DT</p>
              </div>
              <div>
                <button className="button" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </section>
    </div>
  );
};

export default Cart;
