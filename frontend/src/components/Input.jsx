const Input = ({ label, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`text-xs tracking-widest uppercase font-semibold transition-colors duration-200 ${
          error ? "text-red-400" : "text-zinc-500"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:ring-1 transition-all duration-200 ${
          error
            ? "bg-[#F1F1F1] border-red-500 focus:ring-red-400"
            : "bg-[#F1F1F1] border-zinc-800 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      />
      {error && <span className="text-red-400 text-xs flex items-center gap-1">{error}</span>}
    </div>
  );
};

export default Input;