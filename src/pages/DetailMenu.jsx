import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import menuData from "../data/menuData";
import { Check, MoveLeft } from "lucide-react";

const DetailMenu = () => {
  const { id } = useParams();
  const arr =
    JSON.parse(localStorage.getItem("party_menu_saved_recipes")) || [];
  const [IsToggle, setIsToggle] = useState(arr.includes(id));

 
  const menuDetails = menuData.find((m) => m.id == id);
  const { ingredients } = menuDetails;

  const SaveRecipeTog = (id) => {
    if (arr.includes(id)) {
      const updated = arr.filter((i) => i !== id);
      localStorage.setItem("party_menu_saved_recipes", JSON.stringify(updated));
    } else {
      arr.push(id);
      localStorage.setItem(
        "party_menu_saved_recipes",
        JSON.stringify(arr),
      );
    }
  };
  console.log(IsToggle);

  return (
    <div className="max-w-6xl mx-auto text-gray-400 my-5">
      <div className="flex justify-between">
        <Link to={"/"} className="flex  p-2 border gap-1 rounded ">
          <MoveLeft /> Back to Menu
        </Link>
        <div className=" flex gap-3">
          <Link to={"/saved-recipes"} className="  p-2 border  rounded ">
            Saved Recipes
          </Link>

          {IsToggle ? (
            <button
              onClick={() => {
                SaveRecipeTog(id);
                setIsToggle((prev) => !prev);
              }}
              className="flex gap-1 border-green-400 text-green-400 hover:cursor-pointer p-2 border  rounded "
            >
              <Check />
              Save Recipe
            </button>
          ) : (
            <button
              onClick={() => {
                SaveRecipeTog(id);
                setIsToggle((prev) => !prev);
              }}
              className="hover:cursor-pointer  p-2 border  rounded "
            >
              Save Recipe
            </button>
          )}
        </div>
      </div>

      <section className="w-full my-5 flex gap-5">
        <div className="w-full md:w-1/2  ">
          {" "}
          <img
            className="max-h-80 w-full rounded"
            src={menuDetails.image}
            alt={menuDetails.name}
          />{" "}
        </div>
        <div className="w-full md:w-1/2">
          <div className=" flex gap-2">
            <p className="inline my-auto p-2 rounded-full text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-900">
              {menuDetails.category}
            </p>
            <span
              className={` rounded-full p-2 text-xs font-semibold text-white
      ${menuDetails.isVeg ? "bg-green-700" : "bg-red-700"}`}
            >
              {menuDetails.isVeg ? (
                <p className="inline"> Veg</p>
              ) : (
                <p className="inline">Non Veg</p>
              )}
            </span>
          </div>

          <h2 className="text-3xl text-white my-3 font-bold ">
            {menuDetails.name}
          </h2>

          <p className="text-sm text-gray-400">{menuDetails.servings}</p>
          <p className="text-base text-gray-400 mt-2">
            {menuDetails.fullDescription}
          </p>
        </div>
      </section>

      <section className="p-5 bg-[#1A1A22] rounded border border-gray-700">
        <p className="text-white text-2xl font-semibold">Ingredients</p>
        <ul>
          {ingredients.map((ig) => (
            <li
              key={ig.name}
              className="flex rounded p-2 my-2 justify-between bg-black "
            >
              {" "}
              <p className="text-white"> {ig.name}</p>
              <p className="text-white"> {ig.quantity}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DetailMenu;
