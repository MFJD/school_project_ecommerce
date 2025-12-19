import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <header className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-extrabold tracking-wide text-violet-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Electoniks
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/contact" className="text-sm text-gray-600 hover:text-black">Contact Us</Link>
                    <Link to="/signin" className="text-sm text-gray-600 hover:text-black">Sign in</Link>
                    <Link to="/register" className="bg-violet-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-600">Sign up</Link>
                </div>
            </div>
        </header>
    );
} 