export default function SearchBar() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-20">

      <input
        type="text"
        placeholder="Search for a service..."
        className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-orange-400"
      />

    </div>
  );
}