import { useUserInfo} from "../store/userStore"
const MainMenu = () => {
  const user = useUserInfo((state) => state.username);
  const role = useUserInfo((state) => state.role);
  return (
    <div className=" min-h-screen mx-auto bg-[#0F0F11] py-10">
      <div className="">

      <div className="flex justify-between">
          <div className=""> <h1>Party Menu</h1>
            <p className="text-gray-400">Welcome { user}</p></div>
        <div className=""></div>
      </div>
        
      </div>
    </div>
  );
}

export default MainMenu