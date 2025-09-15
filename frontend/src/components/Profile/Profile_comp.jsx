
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { updateUserAPI } from "../../hooks/userAPI";

const Profile_comp = () => {
<<<<<<< HEAD
    const {user, setUser} = useOutletContext();
    const [newUser, setNewUser] = useState([]);
    
    useEffect(() => {
        if(user){
            setNewUser(user)
        }   
    }, [user])
    const handleCancel = () => {
        const cancel = window.confirm('Are you sure?');
        if(cancel){
            setNewUser({...user});
        }
    }
    const handleConfirm = async () => {
        if (!newUser.id) return;
        const confirmUpdate = window.confirm('Are you sure to update the data?');
        if (!confirmUpdate) return;

        try {
            const updatedUser = await updateUserAPI(newUser.id, newUser);
            setUser(updatedUser);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update profile. Please try again.");
        }
    }
=======
    const [firstname, setFirstname] = useState("John");
    const [lastname, setLastname] = useState("Doe");
    const [username, setUsername] = useState("johndoe");
    const [password, setPassword] = useState("password123");
    const [phone, setPhone] = useState("123-456-7890");
    const [email, setEmail] = useState("john.doe@email.com");
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
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
                                value={newUser.firstname || ""}
                                onChange={(e) => setNewUser({...newUser, firstname: e.target.value})}
                                className=
                                'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none'
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Lastname
                            </label>
                            <input
                                type="text"
                                value={newUser.lastname || ""}
                                onChange={(e) => setNewUser({...newUser, lastname: e.target.value})}
                                className=
                                'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none'
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
<<<<<<< HEAD
                            value={newUser.user_name || ""}
                            onChange={(e) => setNewUser({...newUser, user_name: e.target.value})}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
=======
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none'
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
                        />
                   </div>
                   { /* phone */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Phone number
                        </label>
                        <input
                            type="tel"
<<<<<<< HEAD
                            value={newUser.phone_number || ""}
                            onChange={(e) => setNewUser({...newUser, phone_number: e.target.value})}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
=======
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none'
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
                        />
                   </div>
                   { /* Email */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
<<<<<<< HEAD
                            value={newUser.email || ""}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
                        />
                   </div>
                   { /* address */}
                   <div>
                        <label className="block text-sm font-semibold mb-2">
                            Address
                        </label>
                        <textarea
                            value={newUser.address || ""}
                            onChange={(e) => setUser({...newUser, address: e.target.value})}
                            className='w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none transition-all duration-300'
=======
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className= 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 border-[var(--brown-color)] bg-[var(--cream-color)] focus:border-[var(--dark-brown-color)] focus:outline-none'
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
                        />
                   </div>
                   
                </div>
                <div className="flex justify-end items-center mt-8 pt-6 border-t border-[var(--brown-color)]">
                    <div className="flex space-x-8">
                        <button onClick={() => handleCancel()}
                                className="px-6 py-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                        >
                            Cancel
                        </button>
<<<<<<< HEAD
                        <button onClick={() => handleConfirm()}
                                className="!text-white px-6 py-2 bg-amber-800 text-white rounded hover:bg-amber-700 transition-colors duration-300 cursor-pointer"    
=======
                        <button onClick={() => console.log("Save changes")}
                                className="!text-white px-6 py-2 bg-[var(--dark-brown-color)] rounded hover:bg-[var(--light-brown-color)] transition-colors duration-300 cursor-pointer"    
>>>>>>> c252c4ca659b1c00cb83621363b86ed637cb6d2c
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