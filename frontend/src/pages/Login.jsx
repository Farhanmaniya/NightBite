import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleSubmit = async () => {
    const existingToken = localStorage.getItem("token");
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingToken && existingUser) {
      if (existingUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Welcome Back! ");
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (error) {
      setErrors({ email: error.response?.data?.message || "Login failed" });
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.06] blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-[0.04] blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />

      <div className="w-full max-w-3xl flex flex-row rounded-3xl overflow-hidden border border-[#334155]/50 shadow-2xl shadow-black/60 relative z-10 animate-scale-in">

        {/* LEFT — Visual Side */}
        <div
          className="hidden md:flex w-1/2 flex-col items-center justify-center p-10 relative overflow-hidden"
          style={{ backgroundColor: "#1E293B" }}
        >
          {/* Glow blobs */}
          <div className="absolute top-0 left-0 w-56 h-56 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"
            style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

          {/* Food icons */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="text-6xl mb-2 animate-float">🍔</div>
            <div className="flex gap-4 text-3xl">
              <span className="animate-float" style={{ animationDelay: "0.3s" }}>🍕</span>
              <span className="animate-float" style={{ animationDelay: "0.6s" }}>🌮</span>
              <span className="animate-float" style={{ animationDelay: "0.9s" }}>🍜</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#F1F5F9] text-center mb-3 relative z-10">
            Hungry? <span className="text-gradient">We got you.</span>
          </h2>
          <p className="text-[#64748B] text-sm text-center relative z-10 leading-relaxed">
            Login and get your favourite<br />food delivered fast.
          </p>

          <p className="absolute bottom-6 text-xs tracking-[0.15em] uppercase z-10 font-semibold text-gradient">
            🌙 NightBite
          </p>
        </div>

        {/* RIGHT — Form Side */}
        <div
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
          style={{ backgroundColor: "#0F172A" }}
        >
          <p className="text-xs tracking-[0.15em] uppercase mb-2 font-semibold text-gradient">
            Welcome Back
          </p>
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-1 leading-tight">
            Login to
          </h1>
          <h1 className="text-3xl font-bold mb-6 leading-tight text-gradient">
            NightBite 🍔
          </h1>

          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-xs text-[#64748B] hover:text-[#FF6B35] transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-1">
              <Button onClick={handleSubmit}>
                <span className="flex items-center justify-center gap-2">
                  LOGIN <LogIn className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-[#64748B] mt-5">
            No account?{" "}
            <Link to="/signup" className="hover:underline font-semibold text-gradient">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;