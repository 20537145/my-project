import React from 'react'

function Search() {
  return (
    <div className='search-box'>
      <input className='search-txt' type='text' name='' placeholder='Type to search'/>
      <span className='search-btn' href='#'>
      <i className="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
  )
}

export default Search