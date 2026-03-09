import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800">
      <div className="text-center text-white px-4">
        <div className="font-playfair text-8xl font-bold mb-4 opacity-20">404</div>
        <h1 className="font-playfair text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline-white">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
