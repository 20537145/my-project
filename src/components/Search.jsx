// SearchComponent.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct, setSearchTerm } from '../redux/productList';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const [clicked,setClicked]=useState(false)
  const searchTerm = useSelector((state) => state.productsList.searchTerm);
  const status = useSelector((state) => state.productsList.status);
  const searchResults = useSelector((state) => state.productsList.searchResults);
  const navigate = useNavigate();

  const handleSearch = () => {
    setClicked(true)
    dispatch(searchProduct(searchTerm));
  };
  const handleClick = (productId) => {

    navigate(`/products/${productId}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setClicked(true)
    }
  };
  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setClicked(false); 
  };
  return (
    <div>
      <h2 className='search-label'>RECHERCHE</h2>
      <h2 className='search-label'>Entrez un mot pour rechercher nos produits :</h2>
<div className="input-container">
      <input name='text' className='input'
        type="text"
        placeholder="RECHERCHE..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <span className="icon" onClick={handleSearch}> 
    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  </span>
  </div>
  {searchResults.length === 0 && clicked ===true && searchTerm.trim() !== "" && status !== 'loading' && (
      <div className='notFound-product'>
        <h2 >Aucun produit trouvé avec le terme de recherche "{searchTerm}".</h2>
        </div>
          )}
      <div>
      <div className="product-cont">
    <section className="products-section active">
    
  {searchResults.map((product) => (
     <div className="product-card" key={product._id} onClick={()=>handleClick(product._id)}>
     <img src={`https://h-royal-backned.onrender.com/uploads/${product.image}`} alt={` ${product.name}`} />
     <div className="product-details">
       <h2 className="product-name">{product.name}</h2>
       <p className="price">{product.price} DT</p>
       <p className={ product.Availability ? 'in-stock' : 'out-of-stock'}>
         {product.Availability ? 'En stock' : 'Hors stock'}
       </p>
     </div>
   </div>
        ))}
        </section>
  </div>
      </div>
    </div>
  );
};

export default Search;
