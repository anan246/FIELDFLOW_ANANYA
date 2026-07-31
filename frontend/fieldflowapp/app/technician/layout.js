import Sidebar from "@/components/technician/Sidebar";

export default function TechnicianLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#111111]">
      <Sidebar />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}