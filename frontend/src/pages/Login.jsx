import React,{useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom"; 
import Login_Image from "../assets/login.png" //to be change if wanted
import PawLogo from "../assets/logo.png"

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
        <div className="w-screen h-screen flex"> 
            <div className=" w-[60%] h-full ">
                <img className="w-full h-full object-cover" src={Login_Image} alt="Image login"/>

            </div>

            <div className="bg-[var(--beige-cream-color)] h-full w-[40%] flex flex-col items-center pt-16">
                <img src={PawLogo} alt="Logo" className="h-48 w-96 object-contain mt-8" />
                <h1 className="text-[40px] text-[var(--dark-brown-color)] font-bold mt-6">Pawradise In</h1>
                <form className="flex flex-col space-y-2 p-5 w-full" onSubmit={(e) => handleSubmit(e, form, navigate)}>
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col w-4/5 items-center mx-auto">
                        <label
                            className="text-[var(--brown-color)] font-semibold text-left w-full"
                            htmlFor={field.name}
                        >
                            {field.label}
                        </label>
                        <input
                            className="border-[var(--brown-color)] border-2 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)] w-full shadow-lg"
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
                    className={`w-40 h-10 mt-5 rounded shadow px-4 py-2 mx-auto hover:bg-[var(--brown-color)] transition-colors ${
                        isFormValid
                        ? "!text-[var(--beige-cream-color)] bg-[var(--dark-brown-color)]"
                        : "bg-[var(--light-brown-color)] cursor-not-allowed"
                    }`}
                    >
                    Login
                    </button>

                    <hr className="border-t-2 border-[var(--brown-color)] w-3/4 my-4 mx-auto" />
                    <p className="text-[var(--brown-color)] font-medium text-center">Don't have an account?
                         <a href="/register" className="ml-3 !text-red-700 font-semibold text-center hover:underline">
                         Register here
                    </a>
                    </p>
                
            </form>
            </div>
        </div>
    ); 
}

export default Login;