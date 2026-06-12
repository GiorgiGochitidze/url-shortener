import { FiLink } from "react-icons/fi";

const Input = () => {
  return (
    <div className="mt-10 w-auto h-auto flex flex-col justify-center items-center relative">
      <FiLink size={20} color="#C9CED6" className="absolute left-5" />
      <input
        type="url"
        className="w-150 h-15 text-white outline-none rounded-full pl-12 border-3 border-[#353C4A] bg-[#181E29]"
        aria-label="url"
        placeholder="Enter the link here"
      />
      <button className="bg-[#144EE3] outline-none hover:cursor-pointer absolute text-white font-bold right-1.5 px-10 rounded-full h-12 drop-shadow-[#144EE3]">
        Shorten Now!
      </button>
    </div>
  );
};

export default Input;
