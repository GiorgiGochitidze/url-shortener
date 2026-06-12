import { PiSignInLight } from "react-icons/pi";

const Navbar = () => {
  return (
    <header className="z-11 w-full h-20 p-5 flex items-center justify-between fixed top-0 left-0">
      <p className="text-[#144EE3]  font-bold text-2xl">Linkly</p>
      <nav className="flex justify-center items-center gap-5">
        <button className="bg-[#181E29] font-bold border-1 border-[#353C4A] px-4 py-2.5 rounded-full flex justify-center items-center text-white gap-1.25 cursor-pointer">
          Login <PiSignInLight size={15} />
        </button>

        <button className="bg-[#144EE3] font-bold stroke-[#144EE3] px-4 py-2.5 rounded-full flex justify-center items-center text-white gap-1.25 cursor-pointer">
          Register Now
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
