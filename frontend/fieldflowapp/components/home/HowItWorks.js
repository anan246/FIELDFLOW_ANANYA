import {
    CalendarPlus,
    UserCheck,
    Wrench,
    Star,
} from "lucide-react";

const steps = [
    {
        icon: CalendarPlus,
        title: "Book a Service",
        desc: "Choose the service you need and book it in just a few clicks.",
    },
    {
        icon: UserCheck,
        title: "Technician Assigned",
        desc: "A verified technician is assigned based on your location and service.",
    },
    {
        icon: Wrench,
        title: "Service Completed",
        desc: "the technician arrives on time and completes the job professionally.",
    },
    {
        icon: Star,
        title: "Rate & Review",
        desc: "Share your experience to help us maintain high-quality service.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-[#111111] py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-orange-400 uppercase tracking-widest font-semibold">
                        Process
                    </span>

                    <h2 className="text-4xl font-bold text-white mt-3">
                        How FieldFlow Works
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Booking a trusted technician is simple. Follow these four easy steps and get your home service completed without any hassle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {steps.map((step,index) => {
                        const Icon = step.icon;

                        return(
                            <div    
                                key={index}
                                className="relative text-center bg-[#1B1B1B] rounded-2xl p-8 hover:-translate-y-2 translation-all duration-300 border border-transparent hover:border-orange-500">
                                    <div className="mx-auto w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-6">
                                        <Icon className="text-white w-8 h-8" />
                                    </div>

                                    <h3 className="text-white text-xl font-semibold mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        {step.desc}
                                    </p>

                                    <div className="absolute top-6 right-6 text-5xl font-bold text-white/5">
                                        {index + 1}
                                    </div>
                                </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}