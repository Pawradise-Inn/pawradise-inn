import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[var(--light-brown-color)] mt-10">
            {/* Top Layer */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center border-b">
                {/* Left Section */}
                <div>
                    <h2 className="text-lg font-semibold ">Pawradise Inn</h2>
                    <p className="text-sm mt-1">Your pet's favorite place to stay!</p>
                </div>
                {/* Right Section */}
                <div className="flex space-x-4">
                    <a href="/about" className="text-sm hover:text-gray-400">About Us</a>
                    <a href="/contact" className="text-sm hover:text-gray-400">Contact</a>
                    <a href="/privacy" className="text-sm hover:text-gray-400">Privacy Policy</a>
                </div>
            </div>

            {/* Bottom Layer */}
            <div className="bg-[var(--dark-brown-color)] py-4 ">
                <div className="max-w-7xl mx-auto px-4 text-center ">
                    <p className="text-sm text-gray-50">&copy; 2025 Pawradise Inn. All rights reserved.</p>
                    <p className="text-white text-sm mt-1">Your pet's favorite place to stay!</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;