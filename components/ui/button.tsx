export function Button({ children, onClick, variant = "solid", className = "" }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "solid" | "outline";
    className?: string;
  }) {
    const base = "rounded-xl px-4 py-2 text-sm font-medium";
    const styles = variant === "outline"
      ? "border border-gray-300 hover:bg-gray-100"
      : "bg-black text-white hover:bg-gray-800";
    return (
      <button onClick={onClick} className={`${base} ${styles} ${className}`}>
        {children}
      </button>
    );
  }
  