import { useState} from 'react'
import menuData from '../data/menuData'
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState(JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || []);
 
  const len = savedRecipes.length;
  const getSavedRecipesDetails = menuData.filter((m) => savedRecipes.includes(m.id));
 
  const removeRecipe = (id) => { 
    const filteredRecipes = savedRecipes.filter((i) => i !== id)
    setSavedRecipes(filteredRecipes);
    localStorage.setItem("party_menu_saved_recipes", JSON.stringify(filteredRecipes));
    
  }
  return (
    <div className="text-white max-w-6xl mx-auto my-5">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-3xl font-bold">Saved Recipes</h2>
          <p className="text-gray-400">{len} recipe saved</p>
        </div>
        <Link
          to={"/"}
          className="border border-gray-400 hover:border-amber-500 hover:text-amber-500 my-auto p-2 rounded-2xl"
        >
          {" "}
          Back to Menu
        </Link>
      </div>

      <section>
       
        {getSavedRecipesDetails.length>0 ? <div className="grid grid-cols-3 gap-5 mt-5">
          {getSavedRecipesDetails.map((menu) => (
            <RecipeCard
              key={menu.id}
              menu={menu}
              removeButton={
                <button
                  className="w-full h-9 rounded-b-2xl hover:cursor-pointer bg-red-900/50 border border-gray-600 "
                  onClick={() => removeRecipe(menu.id)}
                >
                  Remove{" "}
                </button>
              }
            />
          ))}
          </div>
           : 
          
            <div className='flex flex-col justify-center items-center w-full mt-50'>
              <h2 className="text-lg  text-gray-400"> No saved recipes yet</h2>
               <Link to={"/"} className=' text-xl hover:cursor-pointer text-amber-600 font-bold'>Browse the menu</Link>
        </div>
        
           }

         
      
      </section>
    </div>
  );
}

export default SavedRecipes