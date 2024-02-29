import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("cart")) || {};
    const userCart = storedUser.cart || [];

    console.log("Stored Cart Items:", userCart);

    setCartItems(userCart);
  }, []);

  const removeFromCart = (index) => {
    if (Array.isArray(cartItems)) {
      const updatedCartItems = cartItems.filter((_, i) => i !== index);

      localStorage.setItem("cart", JSON.stringify({ cart: updatedCartItems }));

      setCartItems(updatedCartItems);
    } else {
      console.error("Invalid cartItems structure:", cartItems);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify({ cart: updatedCartItems }));

    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify({ cart: updatedCartItems }));

    setCartItems(updatedCartItems);
  };

  return (
    <div className="cont-cart">
      <div className="home-cart cart-overview">
        <Link to='/'>
          Accueil
        </Link>
      </div>
      <section className="panier cart-overview">
        <div>
          <h4 className="cart-overview">PANIER</h4>
        </div>
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index}>
              <hr />
              <div className="cart-container cart-overview">
                <div className="pr-info">
                  <img
                    src={`https://h-royal-backned.onrender.com/uploads/${item.image}`}
                    alt={item.name}
                  />
                  <div className="br-r flex-col">
                    <p> {item.name}</p>
                    <p >{item.price} DT</p>
                  </div>
                  
                 
                  <div className="quantity-cart br-r">
                    <div>
                    
                    <button className="quantity-btn" onClick={() => increaseQuantity(index)}>+</button>
                      <span className="quantity-span">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => decreaseQuantity(index)}>-</button>
                    </div>
                    <div>
               
                <button onClick={() => removeFromCart(index)} class="cart-btn">RETIRER</button>
                 
                </div>
                </div>
                  </div>
                </div>
              </div>
           
          ))
        ) : (
          <p className="no-cart">Il n'y a plus d'articles dans votre panier</p>
        )}
      </section>
      <div>
        <h2>Total TTC</h2>
        {/* <h1>f</h1> */}
      </div>
      <div className="commander-actions">
        <button className="button"><Link to="/">Continuer Mes Achats</Link></button>
        <button className="button">Commander</button>
      </div>
    </div>
  );
};

export default Cart;
