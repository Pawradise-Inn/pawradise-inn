import React from 'react';
import Login_Image from "../assets/register.png" //to be change if wanted
import PawLogo from "../assets/logo.png"

const Login = ()=>{
    return(
        <div className="w-screen h-screen flex"> 
            <div className=" w-[60%] h-full ">
                <img className="w-full h-full object-cover" src={Login_Image} alt="Image login"/>

            </div>

            <div className="bg-[var(--beige-cream-color)] h-full w-[40%] items-center justify-center">
                <img src={PawLogo} alt="Logo" className="h-48 w-96 object-contain" />

            </div>
        </div>
    ); 
}

export default Login;