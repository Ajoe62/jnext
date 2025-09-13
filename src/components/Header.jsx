import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileNav from './MobileNav';

// components
import Nav from "./Nav";
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 py-6 xl:py-8 text-white bg-primary/95 backdrop-blur-sm z-50 shadow-md">
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
            <Button>Hire me</Button>
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