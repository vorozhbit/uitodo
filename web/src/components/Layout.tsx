import { Outlet } from "react-router-dom";
import Lists from "./Lists";

export function Layout() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:gap-1 lg:gap-10">
      <aside className="border-r-[1px] border-gray-200 bg-[#f6f6f8] p-5">
        <Lists />
      </aside>
      <main className="w-full p-7 lg:p-5 lg:pr-16">
        <Outlet />
      </main>
    </div>
  );
}
