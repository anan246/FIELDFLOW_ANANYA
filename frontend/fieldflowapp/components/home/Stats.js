export default function Stats() {
    const stats  = [
        {
            value: "500+",
            label: "Happy Customers",
        },
        {
            value: "120+",
            label: "Verified Technicians",
        },
        {
            value: "1,000+",
            label: "Servies Completed",
        },
        {
            value: "4.9⭐",
            label: "Customer Rating",
        },
    ];

    return (
        <section className="bg-[#111111] py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {stats.map((item)=>(
                        <div key={item.label} className="bg-[#1B1B1B] 
                        rounded-2xl p-8 text-center border border-[#2B2B2B] hover:border-orange-500 transition duration-300">
                            <h2 className="text-4xl font-bold text-orange-500">
                                {item.value}
                            </h2>

                            <p className="mt-3 text-gray-300">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}