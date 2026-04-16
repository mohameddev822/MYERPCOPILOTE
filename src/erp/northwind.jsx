export default function Northwind( onSelect) {
  return (
    <button className="group relative px-12 py-6 rounded-2xl font-bold text-5xl sm:text-6xl lg:text-7xl
                 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl
                  bg-white/10 border border-white/20 
                  hover:bg-white/20 hover:border-white/40  
                  backdrop-blur-sm
                 text-white shadow-lg" onClick={() => onSelect("northwind")}>
      Northwind
    </button>
  );
}