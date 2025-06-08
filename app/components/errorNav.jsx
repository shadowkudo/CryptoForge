import { Link } from 'react-router';

export default function ErrorNav() {
    return (
        <header className="bg-[#9172FF] text-black px-6 py-4 flex items-center justify-between shadow-md">
            <Link to="/" className="text-lg font-semibold hover:underline">
                CryptoForge
            </Link>
        </header>
    );
}