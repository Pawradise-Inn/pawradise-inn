import React,{useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom"; 
import Login_Image from "../assets/login.png"; 
import PawLogo from "../assets/logo.png";

const fields = [
    { label: "Username", name: "Username", type: "text", placeholder: "Username (For Login)" },
    { label: "Password", name: "Password", type: "password", placeholder: "Password" },
];

const Login = ()=>{
    const [form,setForm] = useState({
        Username: "",
        Password: "",
    });
    const navigate = useNavigate();
    
    const handleChange = (form, setForm) => (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/room");
    };
    
    const onChange = handleChange(form, setForm);
    const isFormValid = Object.values(form).every((field) => field.trim() !== "");

    return(

        <div className="flex flex-col md:flex-row w-full min-h-screen overflow-hidden"> 

            <div className="w-full md:w-3/5 h-64 md:h-auto flex-shrink-0">
                <img 
                    className="w-full h-full object-cover" 
                    src={Login_Image} 
                    alt="Image login"
                />
            </div>

            <div className="bg-[var(--beige-cream-color)] w-full md:w-2/5 flex flex-col items-center justify-center p-6">
                <img 
                    src={PawLogo} 
                    alt="Logo" 
                    className="h-28 w-48 md:h-48 md:w-96 object-contain mt-4 md:mt-8" 
                />
                <h1 className="text-2xl md:text-4xl text-[var(--dark-brown-color)] font-bold mt-4 md:mt-6">
                    Pawradise In
                </h1>

                <form 
                    className="flex flex-col space-y-2 p-4 w-full max-w-md" 
                    onSubmit={(e) => handleSubmit(e, form, navigate)}
                >
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col w-full items-center mx-auto">
                            <label
                                className="text-[var(--brown-color)] font-semibold text-left w-full"
                                htmlFor={field.name}
                            >
                                {field.label}
                            </label>
                            <input
                                className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full"
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={onChange}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full md:w-40 h-10 mt-5 rounded shadow px-4 py-2 mx-auto ${
                            isFormValid
                                ? "!text-[var(--beige-cream-color)] bg-[var(--dark-brown-color)] hover:bg-[var(--brown-color)] hover:!text-[var(--beige-cream-color)] transition-colors cursor-pointer"
                                : "bg-[var(--light-brown-color)]"
                        }`}
                    >
                        Login
                    </button>

                    <hr className="border-t-2 border-[var(--brown-color)] w-3/4 my-4 mx-auto" />

                    <p className="text-[var(--brown-color)] font-medium text-center text-sm md:text-base">
                        Don't have an account?
                        <NavLink 
                            to="/register" 
                            className="text-l ml-2 !text-red-700 font-bold hover:underline"
                        >
                            Register here
                        </NavLink>
                    </p>

                    <p className="text-center text-xs md:text-sm font-normal !text-[var(--brown-color)] mt-4">
                        <a href="/" className="underline">Terms of Service</a>
                        <a href="/" className="ml-3 underline">Privacy Policy</a>
                    </p>
                </form>
            </div>
        </div>
    ); 
}

export default Login;
