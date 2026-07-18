import { useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../store/userStore"
import Cookies from "js-cookie";
import menuData from "../data/menuData.js"
import RecipeCard from "../components/RecipeCard.jsx"

const MainMenu = () => {
  const user = useUserInfo((state) => state.username);
  const role = useUserInfo((state) => state.role);
  const navigate = useNavigate();
  
  const [filteredMenus, setFilteredMenus] = useState(menuData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [diet, setDiet] = useState("All");
  const [filterCount,setFiltercount]=useState(menuData.length)
  
  const totalRes = JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];
  const count = totalRes.length;

  const searchByName = () => {
    
    const items = menuData.filter((m) => {
      
      const categoryFilter =category==="All" || m.category === category;
      console.log(category)
      const dietFilter = diet === "All" || m.isVeg === diet;
      const searchFilter = m.name.toLowerCase().includes(search.toLowerCase() )
      return categoryFilter && dietFilter && searchFilter;
      
    })
     setFiltercount(items.length)
    setFilteredMenus(items)

  }
   
  useEffect(() => {
    searchByName();
  }, [category, diet, search]);


  return (
    <div className=" min-h-screen bg-[#0F0F11] py-10 text-white ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between">
          <div className="">
            {" "}
            <h1 className=" text-3xl font-semibold">Party Menu</h1>
            <p className="text-gray-400">Welcome, {user}</p>
          </div>
          <div className="text-gray-400 flex gap-2">
            <button
              onClick={() => navigate("/saved-recipes")}
              className="h-9 w-full border rounded px-2 my-auto cursor-pointer hover:border-amber-600 "
            >
              Save Recipes{" "}
              <p className="bg-amber-600 inline h-8 w-10 p-1 text-white rounded-full">
                {" "}
                {count}
              </p>
            </button>
            <button
              onClick={() => {
                Cookies.remove("party_menu_token");
                navigate("/signin");
              }}
              className="h-9 border rounded px-2 my-auto cursor-pointer hover:border-amber-600 "
            >
              logout
            </button>
          </div>
        </div>

        <section className="bg-[#1A1A22] p-5 my-5 space-y-2">
          <>
            <p className="text-sm text-gray-400">CATEGORY</p>
            <div className=" flex gap-2 mt-2 text-sm">
              <button
                className={` ${category === "All" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
                onClick={() => setCategory("All")}
              >
                All
              </button>
              <button
                className={` ${category === "starter" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
                onClick={() => setCategory("starter")}
              >
                Starter
              </button>
              <button
                className={` ${category === "main" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
                onClick={() => setCategory("main")}
              >
                Main
              </button>
              <button
                className={` ${category === "sides" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
                onClick={() => setCategory("sides")}
              >
                Sides
              </button>
              <button
                className={` ${category === "desert" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
                onClick={() => setCategory("desert")}
              >
                Desert
              </button>
            </div>
          </>

          <>
            <p className="text-sm text-gray-400">DIET</p>
            <div className=" flex gap-2 mt-2 text-sm">
              <button
                onClick={() => setDiet("All")}
                className={` ${diet === "All" ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
              >
                All
              </button>
              <button
                onClick={() => setDiet(true)}
                className={` ${diet === true ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
              >
                Veg
              </button>
              <button
                onClick={() => setDiet(false)}
                className={` ${diet === false ? "bg-[#E85C05] border-[#E85C05] " : "bg-black border-gray-400 "}  hover:border-[#E85C05] hover:cursor-pointer min-w-14 border  rounded-full p-2`}
              >
                Non-Veg
              </button>
            </div>
          </>

          <div className="flex  gap-4 mt-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 rounded ring-0 border border-gray-400 focus:right-0 focus:outline-none px-2 focus:border-[#E85C05]"
              type="text"
              placeholder="Search by name (e.g. chicken)"
            />

            <button
              onClick={() => searchByName(search)}
              className="bg-[#E85C05] p-2 rounded-full min-w-20 cursor-pointer"
            >
              Search
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-5">
            {filterCount} items found
          </p>
        </section>

        <section>
          {filteredMenus.length > 0 ? (
            <div className="grid grid-cols-3 gap-5">
              {filteredMenus.map((menu) => (
                <RecipeCard key={menu.id} menu={menu} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-40 text-sm text-gray-400">No dishes found. Try different filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default MainMenu