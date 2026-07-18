import React from 'react'
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ menu, removeButton }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1A1A22] mt-2  rounded-2xl border border-gray-500 hover:border-[#E85C05] hover:cursor-pointer">
      <div onClick={() => navigate(`/menu/${menu.id}`)} className="">
        <div className="relative">
          <img
            src={menu.image}
            alt={menu.name}
            className="h-56 w-full object-cover rounded-t-2xl"
          />

          {/* Badge */}
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white
      ${menu.isVeg ? "bg-green-700" : "bg-red-700"}`}
          >
            {menu.isVeg ? <p> Veg</p> : <p>Non Veg</p>}
          </span>
        </div>
        <div className="space-y-3 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
            {menu.category}
          </p>

          <h2 className="text-2xl font-bold text-white">{menu.name}</h2>

          <p className="line-clamp-2 text-sm text-gray-400">
            {menu.description}
          </p>

          <p className="text-sm text-gray-300">{menu.servings}</p>
        </div>
      </div>
      {removeButton && removeButton}
    </div>
  );
};

export default RecipeCard