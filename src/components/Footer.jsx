import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[var(--cream-color)] mt-10">
            {/* Top Layer */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center border-b w-full">
                {/* Left Section */}
                <div className="w-1/2">
                    <h2 className="text-lg font-semibold ">Pawradise Inn</h2>
                    <p className="text-sm mt-1">Pawradise Inn was created to meet the needs of pet owners looking for a safe, clean, and comfortable place for their beloved pets. Whether you’re traveling or unable to care for your pet temporarily, our platform makes it easy to book accommodations in advance, check room availability, choose room types, and add extra services.At Pawradise Inn, we ensure every pet receives professional care and a secure, welcoming stay.</p>
                </div>
                {/* Right Section */}
                    <div className="w-1/2">
                        <h2 className="text-lg text-right font-semibold ">Follow us</h2>
                        <p className="text-sm text-right mt-1 cursor-pointer">Facebook</p>
                        <p className="text-sm text-right mt-1 cursor-pointer">X</p>
                        <p className="text-sm text-right mt-1 cursor-pointer">Instagram</p>
                        <p className="text-sm text-right mt-1 cursor-pointer">Email</p>
                    </div>
                </div>
            <div className="bg-[var(--dark-brown-color)] py-4 ">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm !text-[var(--cream-color)]">&copy; 2025 Pawradise Inn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;