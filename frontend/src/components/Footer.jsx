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
                        <p className="text-xl text-right mt-1"><i className="bi bi-facebook inline-flex justify-center items-center cursor-pointer"></i></p>
                        <p className="text-xl text-right mt-1"><i className="bi bi-twitter-x inline-flex justify-center items-center cursor-pointer"></i></p>
                        <p className="text-xl text-right mt-1"><i className="bi bi-instagram inline-flex justify-center items-center cursor-pointer"></i></p>
                        <p className="text-xl text-right mt-1"><i className="bi bi-envelope inline-flex justify-center items-center cursor-pointer"></i></p>
                    </div>
                </div>
            <div className="bg-[var(--dark-brown-color)] py-2 ">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm !text-[var(--cream-color)]">&copy; 2025 Pawradise Inn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;