import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    link?: string;
}

const data: ContactItemData[] = [
    {
        title: "Visit Us",
        subtitle: "Douala, Cameroon",
        icon: <MapPin className="h-5 w-5 text-white" />,
    },
    {
        title: "Call Us",
        subtitle: "+237 650-921-917",
        link: "tel:+237650921917",
        icon: <Phone className="h-5 w-5 text-white" />,
    },
    {
        title: "Working Hours",
        subtitle: "Mon - Fri: 9:00 AM - 7:00 PM",
        icon: <Clock className="h-5 w-5 text-white" />,
    },
    {
        title: "Email Us",
        subtitle: "W3Agency@gmail.com",
        link: "mailto:W3Agency@gmail.com",
        icon: <Mail className="h-5 w-5 text-white" />,
    },
];

const FooterTop = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b py-10">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                    {/* Icon Circle */}
                    <div className="bg-blue-600 rounded-full p-3 group-hover:bg-blue-700 transition-colors">
                        {item.icon}
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>

                        {item.link ? (
                            <a
                                href={item.link}
                                className="text-gray-500 text-sm hover:text-blue-600 transition"
                            >
                                {item.subtitle}
                            </a>
                        ) : (
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FooterTop;