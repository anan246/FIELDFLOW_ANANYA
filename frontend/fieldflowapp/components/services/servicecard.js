import Image from "next/image";

export default function ServiceCard({
  title,
  image,
  price,
  rating,
  desc,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">

      <div className="relative h-56">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />

      </div>

      <div className="p-6">

        <div className="flex justify-between">

          <h3 className="font-bold text-xl text-[#2D2F39]">
            {title}
          </h3>

          <span className="text-orange-500">
            ⭐ {rating}
          </span>

        </div>

        <p className="text-gray-500 mt-3">
          {desc}
        </p>

        <p className="text-orange-500 font-bold mt-6">
          {price}
        </p>

        <button
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition"
        >
          Book Service
        </button>

      </div>

    </div>
  );
}