export default function FilterDropdown({ options, active, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            active === option
              ? 'bg-primary text-white'
              : 'bg-white border border-iconBg/60 text-muted hover:text-dark'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}