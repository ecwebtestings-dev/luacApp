function Spinner({ size = 20, className = "" }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-iconBg border-t-primary ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function LoadingCard() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-iconBg/40 bg-white/60 backdrop-blur-sm shadow-sm"
      style={{ width: "5cm", height: "5cm" }}
    >
      <Spinner size={28} />
      <p className="text-sm font-medium text-dark">Please wait</p>
    </div>
  );
}

export default Spinner;