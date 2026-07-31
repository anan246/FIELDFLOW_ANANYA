import Sidebar from "@/components/technician/Sidebar";

export default function TechnicianLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F4F6FB]">
      <Sidebar />

      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}