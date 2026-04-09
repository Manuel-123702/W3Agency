import { cn } from '@/lib/utils';
import React from 'react'
import Image from 'next/image';
import logo from '@/images/logo.png';
import Link from 'next/link';

const Logo: React.FC<{ spanDesign?: string, className?: string }> = ({ className }) => (
    <Link href={"/"}>
        <Image src={logo} alt="Logo" className={cn(' h-30 w-60 hover:scale-105 transition-transform', className)} />
    </Link>
);

export default Logo;