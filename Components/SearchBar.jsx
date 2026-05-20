import React from 'react'

export default function SearchBar({ setQuery }) {
  // console.log(setQuery)
  return (
    <div className="search-filter">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        type="text"
        placeholder="Search for a Country....."
      />
    </div>
  )
}
