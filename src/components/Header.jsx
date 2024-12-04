import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';

// components
import Nav from "./Nav";
const Header = () => {
  return (
  <header className="py-8 xl:py-12 text-white bg-pink-50/20">
    <div className="container mx-auto flex justify-between items-center">

        <Link href="/">
        <h1 className="text-4xl font-semibold">
            Joseph<span className='text-accent'>.</span>
        </h1>
        </Link>

        {/* destop nav & hire me button */}
        <div className="hidden xl:flex items-center gap-8">
        <Nav />
        <Link href="/contact">
        <Button>Hire me now</Button>
        </Link>
    </div>

    {/* mobile nav */}
    <div className="xl:hidden">
        <MobileNav />
    </div>
    </div>
  </header>
  );
};


export default Header;