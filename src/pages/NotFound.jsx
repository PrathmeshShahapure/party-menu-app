import React from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
const NotFound = () => {

  const token = Cookies.get("party_menu_token");

  return (
    <div className="text-white flex flex-col justify-center items-center min-h-screen">
      <div className=" mb-5">
        <h1 className="text-amber-600 text-6xl font-extrabold text-center ">
          404
        </h1>
        <p className="text-center mt-2 text-2xl font-bold"> Page Not Found</p>
      </div>
      {token ? (
        <Link
          to={"/signin"}
          className="bg-amber-600 text-white font-extrabold p-2 rounded hover:cursor-pointer"
        >
          Back to Menu
        </Link>
      ) : (
        <Link
          to={"/signin"}
          className="bg-amber-600 text-white font-extrabold p-2 rounded hover:cursor-pointer"
        >
          Back to sign in
        </Link>
      )}
    </div>
  );
}

export default NotFound