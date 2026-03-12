import { Heart } from "lucide-react";

function Footer({ isNight }) {
  return (
    <footer className={`mt-20 mb-10 transition-all duration-500`}>
      <div className="flex flex-col items-center gap-4">
        
        {/* Visual Line with Gradient */}
        <div className={`w-32 h-[1px] ${
          isNight 
            ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" 
            : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
        }`} />

        <div className={`flex flex-col items-center gap-1 ${isNight ? 'text-white/40' : 'text-slate-500'}`}>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
            <span>© 2026</span>
            <span className={isNight ? "text-white" : "text-slate-900"}>SkyCast</span>
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span>Built with Precision</span>
          </div>
          
          <p className="flex items-center gap-1.5 text-[10px] font-bold opacity-60">
            Handcrafted with <Heart size={10} className="text-rose-500 fill-rose-500" /> for the Weather Enthusiasts
          </p>
        </div>

        {/* Tech Stack Badges (Optional but looks pro) */}
        <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
           <span className="text-[9px] font-black tracking-widest uppercase">React</span>
           <span className="text-[9px] font-black tracking-widest uppercase">Framer Motion</span>
           <span className="text-[9px] font-black tracking-widest uppercase">OpenWeather</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;