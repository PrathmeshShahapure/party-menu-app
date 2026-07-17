import { useState } from "react";
import { SigninReq } from "../api/Signin";
import { HandPlatter } from "lucide-react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserInfo } from "../store/userStore";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUsername = useUserInfo((state) => state.setUsername);
  const setUserRole = useUserInfo((state) => state.setUserRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await SigninReq(formData);
      const token = response?.data?.data?.token;
      setUsername(response.data?.data?.user?.name);
      setUserRole(response.data?.data?.user?.role);
      Cookies.set("party_menu_token", token, { expires: 1 });
      navigate("/", { replace: true });
    } catch (error) {
      setError(error?.response?.data?.message || error?.message);
    } finally {
      setFormData({ email: "", password: "" });
      setLoading(false);
    }
  };

  const token = Cookies.get("party_menu_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-radial from-0% from-[#4b1f04] to-black ">
      <div className="bg-[#1A1A22] min-w-sm shadow p-2 text-white border-2 border-gray-600 rounded-xl space-y-2 py-5 px-10">
        <div className="w-20 h-20 rounded-full bg-gray-700 flex justify-center items-center mx-auto">
          <HandPlatter size={28} />
        </div>
        <h1 className="text-center font-semibold text-xl">Party Menu</h1>
        <p className="text-center text-gray-400 text-sm">
          Sign in to explore our delicious menu
        </p>

        {error && (
          <p className=" h-8 rounded bg-red-500/10 border-red-500 p-2 pb-3 text-red-600 text-sm ">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-5">
          <label className="text-sm text-gray-400" htmlFor="email">
            Email
          </label>
          <input
            className=" h-8 px-2 border border-gray-400 rounded focus:outline-none focus:ring-0 focus:border-[#f59052]"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <label className="text-sm text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            className=" h-8 px-2 border border-gray-400 rounded focus:outline-none focus:ring-0 focus:border-[#f59052]"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            className="w-24 h-9 rounded bg-amber-600 hover:cursor-pointer mt-2 mx-auto"
            type="submit"
          >
            {loading ? <p>Signing in…</p> : <p>Sign in</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
