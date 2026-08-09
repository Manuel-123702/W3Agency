import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle, MapPin } from "lucide-react";
import testimonial1 from "../images/banner_4.png";
import testimonial2 from "../images/banner_5.png";
import testimonial3 from "../images/banner_6.png";
import testimonial4 from "../images/acc_1.png";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  image: any;
  rating: number;
  text: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Kouassi",
    role: "Business Owner",
    location: "Abidjan, Côte d'Ivoire",
    image: testimonial1,
    rating: 5,
    text: "Excellent service! The laptop I ordered arrived in perfect condition. The WhatsApp ordering process was smooth and the team was very responsive. Highly recommend SKY Electronics for all your tech needs!",
    product: "Premium Laptop Bundle"
  },
  {
    id: 2,
    name: "Jean-Pierre Mensah",
    role: "IT Professional",
    location: "Accra, Ghana",
    image: testimonial2,
    rating: 5,
    text: "Best electronics store I've found. The smart TV I purchased has amazing picture quality and the price was unbeatable. Fast delivery and great customer support throughout the entire process.",
    product: "Smart TV 55\" 4K"
  },
  {
    id: 3,
    name: "Aminata Diallo",
    role: "Home Manager",
    location: "Dakar, Senegal",
    image: testimonial3,
    rating: 5,
    text: "I'm impressed with the quality of products and service. The home theater system transformed my living room into a cinema experience. Will definitely shop here again!",
    product: "Home Theater System"
  },
  {
    id: 4,
    name: "Kofi Asante",
    role: "Restaurant Owner",
    location: "Lagos, Nigeria",
    image: testimonial4,
    rating: 5,
    text: "Professional service from start to finish. The washing machine works perfectly and the installation was hassle-free. Thank you SKY Electronics for exceeding my expectations!",
    product: "Washing Machine"
  }
];

const Testimonials = () => {
  return (
    <section className="my-16 bg-gradient-to-br from-white via-blue-50 to-white py-12 px-4 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Real reviews from real customers who have experienced our premium electronics and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-violet-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-violet-200" />
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-6 min-h-[120px]">
                "{testimonial.text}"
              </p>

              <div className="border-t border-blue-100 pt-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-violet-200 shadow-md">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-violet-600 font-medium">{testimonial.role}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-violet-50 to-blue-50 px-3 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-slate-700 font-medium">
                    Verified Purchase: {testimonial.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-violet-500 via-light-blue-400 to-blue-500 px-8 py-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-white text-white" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.9/5</span>
            </div>
            <span className="text-white/90 text-lg">Average Rating</span>
            <span className="text-white/80">based on 500+ verified reviews</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Join thousands of satisfied customers across West Africa who trust SKY Electronics for their premium electronics needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
