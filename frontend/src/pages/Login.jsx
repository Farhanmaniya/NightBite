import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { LogIn } from "lucide-react";
import API from "../api/axios";

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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return ;
    }

    try {
      const response = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      // Save token and user to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate based on role
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      }else {
        navigate("/home");
      }
    } catch (error) {
      setErrors({ email: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-3xl flex flex-row rounded-3xl overflow-hidden border border[#334155] shadow-2xl shadow-black/60">

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

          {/* Food icons cluster */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="text-6xl mb-2">🍔</div>
            <div className="flex gap-4 text-3xl">
              <span>🍕</span>
              <span>🌮</span>
              <span>🍜</span>
            </div>
          </div>

          <h2
            className="text-2xl font-bold text-[#F1F5F9] text-center mb-3 relative z-10"
          >
            Hungry? <span style={{ color: "#FF6B35" }}>We got you.</span>
          </h2>
          <p className="text-zinc-500 text-sm text-center relative z-10 leading-relaxed">
            Login and get your favourite<br />food delivered fast.
          </p>

          {/* Bottom tag */}
          <p
            className="absolute bottom-6 text-xs tracking-widest uppercase z-10 font-semibold"
            style={{ color: "#FF6B35" }}
          >
            🌙 NightBite
          </p>
        </div>

        {/* RIGHT — Form Side */}
        <div
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
          style={{ backgroundColor: "#0F172A" }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-2 font-semibold"
            style={{ color: "#FF6B35" }}
          >
            Welcome Back
          </p>
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-1 leading-tight">
            Login to
          </h1>
          <h1 className="text-3xl font-bold mb-6 leading-tight" style={{ color: "#FF6B35" }}>
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

            {/* Forgot Password */}
            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-xs text-zinc-500 hover:text-[#FF6B35] transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-1">
              <Button onClick={handleSubmit}><span className="flex items-center justify-center gap-2">
                  LOGIN <LogIn className="w-4 h-4" />
                </span></Button>
            </div>

          </div>

          <p className="text-center text-xs text-zinc-400 mt-5">
            No account?{" "}
            <Link to="/signup" className="hover:underline font-semibold" style={{ color: "#FF6B35" }}>
              Sign up free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;