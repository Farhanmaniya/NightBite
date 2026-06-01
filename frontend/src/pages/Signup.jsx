import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    if (!form.confirm) newErrors.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) newErrors.confirm = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 h-screen overflow-hidden"
      style={{ backgroundColor: "#0F172A", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="w-full max-w-3xl flex flex-row rounded-3xl overflow-hidden border border-[#334155] shadow-2xl shadow-black/60">

        {/* LEFT — Visual Side */}
        <div
          className="hidden md:flex w-1/2 flex-col items-center justify-center p-10 relative overflow-hidden"
          style={{ backgroundColor: "#1A1A1A" }}
        >
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 -translate-x-1/2 translate-y-1/2"
            style={{ background: "radial-gradient(circle, #FF6B35, transparent)" }} />

          {/* Food icons cluster */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="flex gap-3 text-4xl mb-2">
              <span>🍣</span>
              <span>🥗</span>
            </div>
            <div className="text-6xl my-1">🍕</div>
            <div className="flex gap-3 text-4xl mt-2">
              <span>🧆</span>
              <span>🍩</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#F1F5F9] text-center mb-3 relative z-10">
            1000+ dishes <span style={{ color: "#FF6B35" }}>await.</span>
          </h2>
          <p className="text-zinc-500 text-sm text-center relative z-10 leading-relaxed">
            Create your account and start<br />ordering in seconds.
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
            Get Started
          </p>
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-1 leading-tight">
            Join
          </h1>
          <h1 className="text-3xl font-bold mb-6 leading-tight" style={{ color: "#FF6B35" }}>
            NightBite 🌙
          </h1>

          <div className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
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
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={(e) => handleChange("confirm", e.target.value)}
              error={errors.confirm}
            />

            <div className="mt-1">
              <Button onClick={handleSubmit}>CREATE ACCOUNT →</Button>
            </div>

          </div>

          <p className="text-center text-xs text-zinc-400 mt-5">
            Already have an account?{" "}
            <Link to="/" className="hover:underline font-semibold" style={{ color: "#FF6B35" }}>
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;