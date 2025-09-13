"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { NAV_LINKS } from '@/lib/constants';

const Nav = () => {
    const pathname = usePathname();
    return <nav className='flex gap-8'>
        {NAV_LINKS.map((link, index) => {
            return (
                <Link href={link.path} key={index}
                    prefetch={true}
                    className={`${link.path === pathname && "text-accent border-b-2 border-accent"
                        } capitalize font-medium hover:text-accent transition-all`}>
                    {link.name}
                </Link>
            );
        })}
    </nav>
}


export default Nav;