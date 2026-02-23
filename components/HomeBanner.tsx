import React from 'react'
import { Title } from './ui/text';
import Link from 'next/link';
import Image from 'next/image';
import bannerImage from '../images/banner_2.png'
const HomeBanner = () => {
    return (
        <div className='py-18 md:py-0 bg-linear-to-r from-sky-400 to-sky-600 rounded-lg  px-10 lg:px-24 
    flex items-center fill justify-between'>
            <div className='space-y-5'>
                <Title>
                    Discover Upto 20% Off<br />
                     Of Amazing Deals For A Short Time 
                </Title>
                <Link href={"/shop"} className='inline-flex items-center justify-center w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out'>
                   Buy Now
                </Link>
            </div>
            <div>
                <Image src={bannerImage}  alt="banner_1" 
                />
            </div>
        </div>
    );
};

export default HomeBanner;
