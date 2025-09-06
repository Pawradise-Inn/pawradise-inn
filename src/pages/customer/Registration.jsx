import React,{useState} from "react";
import registerImg from "../../assets/register.png"; //to be change if wanted
const fields = [
  { label: "Firstname", name: "Firstname", type: "text", placeholder: "First Name" },
  { label: "Lastname", name: "Lastname", type: "text", placeholder: "Last Name" },
  { label: "Email", name: "Email", type: "email", placeholder: "Email" },
  { label: "Username", name: "Username", type: "text", placeholder: "Username (For Login)" },
  { label: "Password", name: "Password", type: "password", placeholder: "Password" },
  { label: "*Confirm Password", name: "ConfirmPassword", type: "password", placeholder: "Confirm Password" },
  { label: "Phone Number", name: "PhoneNumber", type: "text", placeholder: "0xxxxxxxxx" },
//   { label: "Address", name: "Address", type: "text", placeholder: "Address" },
];

const Registration = () => {
        const [form, setForm] = useState({
            Firstname: '',
            Lastname: '',
            Username: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            PhoneNumber: '',
            Address: ''
        });
        const handleChange = (e) =>{
            setForm({...form,[e.target.name]:e.target.value});
        }
        const handleSubmit = (e) =>{
            e.preventDefault();
            //submit form logic here
            if (form.Password !== form.ConfirmPassword){
                alert("Password do not match");
                return;
            }
            console.log(form);  
            aleart("Registration Successful");
        }
  return (
    <div className="w-screen h-screen">
        <div className="w-[60%] h-full float-left">
            <img className="w-full h-full object-cover" src={registerImg} alt="Registration Image"/>
        </div>

        <div className="w-[40%] h-full float-right bg-[var(--cream-color)]">
            <h1 className="text-center pt-5 text-[40px] text-[var(--brown-color)] font-bold"> Registration </h1>
            <form className="flex flex-col space-y-2 p-5" onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label className="text-[var(--brown-color)] font-semibold" htmlFor={field.name}>{field.label}</label>
                        <input 
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)]"
                            type={field.type} 
                            name={field.name} 
                            placeholder={field.placeholder} 
                            value={form[field.name]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <h2 className="text-[var(--brown-color)] font-semibold" > Adress</h2>
                <textarea
                    name="Address"
                    placeholder="Address"
                    value={form.Address}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[var(--light-brown-color)]"
                    rows="3"
                ></textarea>
            </form>
            <div className="flex float-right gap-4 p-2 ml-auto">
                <button className="w-40 h-10 text-[var(--dark-brown-color)] bg-[var(--light-brown-color)] rounded shadow px-4 py-2  hover:bg-[var(--brown-color)]">
                    cancel
                </button>
                <button className="w-40 h-10 !text-[var(--done-button)] bg-[var(--dark-brown-color)] rounded shadow px-4 py-2">
                    done
                </button>
            </div>
        </div>
    </div>
  );
};

const RegistrationFrom =() =>{
    return(
        <input/>
    );
}

export default Registration;
