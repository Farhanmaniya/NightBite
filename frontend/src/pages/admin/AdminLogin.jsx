import { LogIn, ShieldUser } from "lucide-react";
import Input from "../../components/Input";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm({...form, [field]: value});
        if (errors[field]) setErrors({ ...errors, [field]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = "Email is required";
        else if(!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return ;
        }
        navigate("/admin/menu");
    };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: "#0F0F0F",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
        <div className="w-full max-w-md bg-[#1A1A1A] rounded-3xl border border-zinc-800 p-8 flex flex-col gap-6">

            {/* Top - Logo + Title */}
            <div className="flex flex-col gap-4">
                {/* Icon */}
                <ShieldUser className="w-12 h-12 text-[#FF6b35] shrink-0" />

                {/* Texts */}
                <div>
                    <h1 className="text-white font-bold text-2xl">Admin Login</h1>
                    <p className="text-zinc-500 text-sm">NightBite Admin Panel</p>
                </div>
            </div>

            {/* Form Fields */}
            {/* Use your Input component here */}
            {/* Email Input */}
            <div className="flex flex-col gap-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={errors.email}
                />
            </div>
            {/* Password input */}
            <div className="flex flex-col gap-4">
                <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                />
            </div>
            {/* Forget Password */}
            <div className="flex justify-end -mt-2">
                <Link 
                    to="/forget-password"
                    className="text-xs text-zinc-500 hover:text-[#FF6B35] transition-colors duration-200"
                >
                    Forget password?
                </Link>
            </div>

            {/* Login Button */}
            <div className="mt-1">
                <Button onClick={handleSubmit}>
                    <span className="flex items-center justify-center gap-2">LOGIN <LogIn className="w-4 h-4" /></span>
                </Button>
            </div>
            {/* Use your button component here */}
        </div>
    </div>
  );
};

export default AdminLogin;
