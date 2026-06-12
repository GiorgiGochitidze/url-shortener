import Input from "@/components/Input";
import LinksTable from "@/components/LinksTable";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="z-10 w-full h-screen flex flex-col items-center justify-center gap-6 px-10 mb-[-150]">
        <h1
          className="bg-clip-text text-transparent font-bold text-5xl text-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #144EE3 0%, #EB568E 19%, #A353AA 64%, #144EE3 100%)",
          }}
        >
          Shorten Your Looooping Links :)
        </h1>
        <p className="text-[#C9CED6] text-sm text-center">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your <br /> online experience.
        </p>
        <Input />
      </div>

      {/* table section — below the fold */}
      <div className="z-10 w-full px-10 pb-10">
        <LinksTable isSample={true} />
      </div>
    </div>
  );
}
