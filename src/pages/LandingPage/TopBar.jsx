export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-[35px] flex items-center justify-end px-4 bg-primary z-[10001]">
      <div className="flex items-center">
        <a
          href="mailto:luac@lirauni.ac.ug"
          className="text-xs text-cream mx-2 pl-2 border-l border-line hover:text-karki transition-colors"
        >
          luac@lirauni.ac.ug
        </a>
        <a
          href="tel:+256777891441"
          className="text-xs text-cream mx-2 pl-2 border-l border-line hover:text-karki transition-colors"
        >
          +256 777891441
        </a>
      </div>
    </div>
  )
}