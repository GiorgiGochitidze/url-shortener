// app/dashboard/page.tsx
import Input from "@/components/Input";
import LinksTable from "@/components/LinksTable";

export default function DashboardPage() {
  return (
    <div className=" w-full min-h-screen p-10 text-white pt-28 z-10">
      <div className="w-full h-auto mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold">Your Link Dashboard</h1>
          <p className="text-[#C9CED6] text-sm mt-1">
            Create, track, and manage your shortened URLs.
          </p>
        </div>

        <Input />
        <LinksTable />
      </div>
    </div>
  );
}
