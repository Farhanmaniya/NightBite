const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {
  if (variant === "outline") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="w-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-[#FF6B35] font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-[#FF6B35] hover:bg-[#ff8255] active:scale-[0.98] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm tracking-widest shadow-lg shadow-[#FF6B35]/20 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {children}
    </button>
  );
};

export default Button;