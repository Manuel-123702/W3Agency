import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react'

interface ContactItemData{
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const data: ContactItemData[] = [
    {
        title: "Visit Us",
        subtitle: "Douala, Cameroon",
        icon: (
            <MapPin className='h-6 w-6 text-blue-600 group-hover:text-primary transition-colors'/>
        ),
    },

    {
        title: "Call Us",
        subtitle: "+237 650-921-917",
        icon: (
            <Phone className='h-6 w-6 text-blue-600 group-hover:text-primary transition-colors'/>
        ),
    },

    {
        title: "Working Hours",
        subtitle: "Mon - Fri: 9:00 AM - 7:00 PM",
        icon: (
            <Clock className='h-6 w-6 text-blue-600 group-hover:text-primary transition-colors'/>
        ),
    },

    {
        title: "Email Us",
        subtitle: "W3Agency@gmail.com",
        icon: (
            <Mail className='h-6 w-6 text-blue-600 group-hover:text-primary transition-colors'/>
        ),
    },

]


const FooterTop = () => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 border-b'>
        {data?.map((item, index) => (
            <div key={index} className='flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors hoverEffect'>
            {item?.icon}
            <div>
                <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 hoverEffect'>
                    {item?.title}
                    <p className='text-gray-900 text-sm mt-1 group-hover:text-blue-600 hoverEffect'>
                        {item?.subtitle}
                    </p>
                </h3>
            </div>
            </div>
        ))}
    </div>
  );
};

export default FooterTop;