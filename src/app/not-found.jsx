import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">404 - Page Not Found</h1>
      <p className="text-lg mb-8 text-center">The page you're looking for doesn't exist.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}