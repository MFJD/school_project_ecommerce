export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 ">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
                <div>
                    <h4 className="text-white font-bold mb-2">Electoniks</h4>
                    <p className="text-sm">Premium electronics carefully selected for you.</p>
                    <p className="text-sm mt-2">123 Main Street, Paris, France</p>
                    <p className="text-sm mt-1">email@electoniks.com</p>
                    <p className="text-sm mt-1">+33 1 23 45 67 89</p>
                </div>
                <div>
                    <h5 className="text-white font-semibold mb-2">Shop</h5>
                    <ul className="text-sm space-y-1">
                        <li>Laptops</li>
                        <li>Smartphones</li>
                        <li>Accessories</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-semibold mb-2">Company</h5>
                    <ul className="text-sm space-y-1">
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Careers</li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-white font-semibold mb-2">Newsletter</h5>
                    <p className="text-sm mb-2">Subscribe to get latest updates.</p>
                    <div className="flex gap-2">
                        <input className="flex-1 rounded-lg px-3 py-2" placeholder="Email address" />
                        <button className="bg-violet-500 px-3 py-2 rounded-lg text-white">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}