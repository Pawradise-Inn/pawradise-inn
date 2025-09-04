import { useState } from "react";

const Profile_comp = () => {
    const [firstname, setFirstname] = useState("John");
    const [lastname, setLastname] = useState("Doe");
    const [username, setUsername] = useState("johndoe");
    const [password, setPassword] = useState("password123");
    const [phone, setPhone] = useState("123-456-7890");
    const [email, setEmail] = useState("john.doe@email.com");
    const [address, setAddress] = useState("123 Main St, City, Country");
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Profile
                </h1>
            </div>
            <div className="max-w-2xk bg-white rounded shadow-lg p-8">
                <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Firstname
                            </label>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className=
                                'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Lastname
                            </label>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className=
                                'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                            />
                        </div>
                   </div>
                   { /* username */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                   { /* password */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                   { /* phone */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                   { /* Email */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                   { /* address */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Username
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                </div>
                <div className="flex justify-end items-center mt-8 pt-6 border-t border-[var(--brown-color)]">
                    <div className="flex space-x-8">
                        <button onClick={() => console.log("Cancel changes")}
                                className="px-6 py-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button onClick={() => console.log("Save changes")}
                                className="!text-white px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700 transition-colors duration-300 cursor-pointer"    
                        >
                            Done
                        </button>

                    </div>

                </div>
            </div>
            <div>

            </div>
        </div>
    )

}

export default Profile_comp