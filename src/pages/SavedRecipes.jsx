import React from 'react'
import menuData from '../data/menuData'
import { Link } from 'react-router-dom';
const SavedRecipes = () => {
  const savedRecipes = JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];
  const len = savedRecipes.length;
  console.log(savedRecipes.length)
  return (
    <div className='text-white max-w-6xl mx-auto my-5'>

      <div className="flex justify-between">
        <div className="">
          <h2 className='text-3xl font-bold'>Saved Recipes</h2>
          <p className="text-gray-400">{ len} recipe saved</p>
        </div>
         <Link to={"/"} className='border border-gray-400 hover:border-amber-500 hover:text-amber-500 my-auto p-2 rounded-2xl' > Back to Menu</Link>
      </div>
    </div>
  )
}

export default SavedRecipes