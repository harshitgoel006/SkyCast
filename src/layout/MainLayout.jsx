

// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { getCurrentWeather, getForecast, getAirQuality } from "../services/weatherApi";
// import { formatCurrentWeather } from "../utils/helpers";

// // --- 🌌 Dynamic Atmosphere Engine (Rain, Stars, Clouds) ---
// const DynamicAtmosphere = ({ condition, isNight }) => {
//   const isRainy = condition?.toLowerCase().includes("rain") || condition?.toLowerCase().includes("drizzle");
//   const isCloudy = condition?.toLowerCase().includes("cloud");
//   const isStormy = condition?.toLowerCase().includes("thunderstorm");

//   return (
//     <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
//       {/* 1. ✨ Twinkling Stars (Only at Night + Clear/Cloudy) */}
//       {isNight && !isRainy && (
//         <div className="absolute inset-0">
//           {[...Array(150)].map((_, i) => (
//             <motion.div
//               key={`star-${i}`}
//               initial={{ opacity: Math.random() }}
//               animate={{ opacity: [0.2, 0.8, 0.2] }}
//               transition={{
//                 duration: 2 + Math.random() * 3,
//                 repeat: Infinity,
//                 delay: Math.random() * 5,
//               }}
//               className="absolute bg-white rounded-full"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 2 + 1}px`,
//                 height: `${Math.random() * 2 + 1}px`,
//                 boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* 2. 🌧️ Realistic Rain (Only when Rainy) */}
//       {isRainy && (
//         <div className="absolute inset-0 z-10">
//           {[...Array(100)].map((_, i) => (
//             <div
//               key={`rain-${i}`}
//               className="absolute bg-white/20 w-[1px] h-[80px]"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: "-100px",
//                 animation: `rain-fall ${0.5 + Math.random() * 0.5}s linear infinite`,
//                 animationDelay: `${Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* 3. ☁️ Dynamic Clouds (Color changes based on Day/Night/Storm) */}
//       {(isCloudy || !isNight || isRainy) && (
//         <div className="absolute inset-0">
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={`cloud-${i}`}
//               initial={{ x: "-150%" }}
//               animate={{ x: "120vw" }}
//               transition={{
//                 duration: isStormy ? 40 : 80 + i * 15,
//                 repeat: Infinity,
//                 ease: "linear",
//                 delay: -i * 20,
//               }}
//               className={`absolute blur-[100px] rounded-full transition-colors duration-1000 ${
//                 isStormy ? "bg-slate-900/60" : isNight ? "bg-slate-700/30" : "bg-white/40"
//               }`}
//               style={{
//                 top: `${i * 12 + 5}%`,
//                 width: `${600 + Math.random() * 400}px`,
//                 height: `${300 + Math.random() * 150}px`,
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // --- 🎨 Premium Weather Themes Mapping ---
// const weatherThemes = {
//   Clear: {
//     day: "from-[#4facfe] via-[#00f2fe] to-[#ffffff]",
//     night: "from-[#0f172a] via-[#1e293b] to-[#020617]",
//     accent: "text-blue-600",
//   },
//   Clouds: {
//     day: "from-[#bdc3c7] via-[#ebedee] to-[#ffffff]",
//     night: "from-[#2c3e50] via-[#4b6cb7] to-[#182848]",
//     accent: "text-slate-600",
//   },
//   Rain: {
//     day: "from-[#203A43] via-[#2C5364] to-[#0F2027]",
//     night: "from-[#000000] via-[#0f172a] to-[#232526]",
//     accent: "text-indigo-400",
//   },
//   Default: {
//     day: "from-[#a2d2ff] via-[#caf0f8] to-[#ffffff]",
//     night: "from-[#0f172a] via-[#1e293b] to-[#334155]",
//     accent: "text-blue-500",
//   }
// };

// function MainLayout({ children }) {
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("metric");
//   const [forecast, setForecast] = useState(null);
//   const [airQuality, setAirQuality] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchWeather = async (city) => {
//     try {
//       setLoading(true);
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
//       );
//       const geoData = await geoRes.json();
//       if (geoData.length > 0) {
//         const { lat, lon } = geoData[0];
//         const [w, f, a] = await Promise.all([
//           getCurrentWeather(lat, lon, unit),
//           getForecast(lat, lon, unit),
//           getAirQuality(lat, lon),
//         ]);
//         setWeather(formatCurrentWeather(w));
//         setForecast(f.list);
//         setAirQuality(a);
//       }
//     } catch (e) { console.error(e); } 
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchWeather("Dehradun"); }, [unit]);

//   const isNight = useMemo(() => {
//     if (!weather) return false;
//     const currentTime = Math.floor(Date.now() / 1000);
//     return currentTime < weather.sunrise || currentTime > weather.sunset;
//   }, [weather]);

//   // Determine current theme
//   const currentTheme = useMemo(() => {
//     const mainCondition = weather?.condition || "Default";
//     return weatherThemes[mainCondition] || weatherThemes.Default;
//   }, [weather]);

//   return (
//     <div className={`relative min-h-screen w-full font-['Outfit'] overflow-hidden transition-colors duration-1000 bg-gradient-to-br ${isNight ? currentTheme.night : currentTheme.day}`}>
      
//       {/* 1. Global Atmosphere Engine (Stars/Rain/Clouds) */}
//       <DynamicAtmosphere condition={weather?.condition} isNight={isNight} />

//       {/* 2. Soft Glow Overlay (Premium Depth) */}
//       <div className="fixed inset-0 bg-white/[0.02] pointer-events-none z-[2]" />

//       {/* 3. Layout Structure */}
//       <div className="relative z-10 flex flex-col min-h-screen">
        
//         <header className="sticky top-0 z-[100] border-b border-white/10 bg-white/5 backdrop-blur-2xl">
//           <div className="max-w-[1400px] mx-auto px-6">
//             <Navbar onSearch={fetchWeather} currentCity={weather?.city} unit={unit} setUnit={setUnit} isNight={isNight} />
//           </div>
//         </header>

//         <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-8">
//           <AnimatePresence mode="wait">
//             {!loading ? (
//               <motion.div
//                 key={weather?.city || 'loading'}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.6, ease: "circOut" }}
//               >
//                 {React.cloneElement(children, { 
//                     weather, 
//                     forecast, 
//                     airQuality, 
//                     onSearch: fetchWeather,
//                     condition: weather?.condition,
//                     isNight: isNight 
//                 })}
//               </motion.div>
//             ) : (
//               <div className="h-[70vh] w-full flex flex-col items-center justify-center">
//                  <motion.div 
//                     animate={{ 
//                       scale: [1, 1.2, 1],
//                       rotate: 360 
//                     }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
//                  />
//                  <p className="mt-6 text-white/70 font-medium tracking-[0.2em] animate-pulse">SYNCHRONIZING SKY</p>
//               </div>
//             )}
//           </AnimatePresence>
//         </main>
        
//         <Footer />
//       </div>

//       <style jsx global>{`
//         @keyframes rain-fall {
//           0% { transform: translateY(-100px) rotate(10deg); opacity: 0; }
//           50% { opacity: 1; }
//           100% { transform: translateY(100vh) rotate(10deg); opacity: 0; }
//         }

//         body {
//           color: ${isNight ? '#f8fafc' : '#1e293b'};
//           background: ${isNight ? '#020617' : '#f0f9ff'};
//         }

//         .glass-card {
//           background: ${isNight ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.2)'} !important;
//           backdrop-filter: blur(20px) saturate(180%);
//           border: 1px solid ${isNight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.4)'} !important;
//           border-radius: 32px;
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .glass-card:hover {
//           transform: translateY(-5px);
//           background: ${isNight ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.3)'} !important;
//           border-color: ${isNight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.6)'} !important;
//         }

//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { 
//           background: rgba(255, 255, 255, 0.2); 
//           border-radius: 10px; 
//         }
//       `}</style>
//     </div>
//   );
// }

// export default MainLayout;



// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { getCurrentWeather, getForecast, getAirQuality } from "../services/weatherApi";
// import { formatCurrentWeather } from "../utils/helpers";

// // --- 🌌 Advanced WeatherScene Engine ---
// const WeatherScene = ({ condition, isNight }) => {
//   const cond = (condition || "").toLowerCase()

// const isRainy = cond.includes("rain") || cond.includes("drizzle")
// const isStormy = cond.includes("thunder")
// const isCloudy = cond.includes("cloud") || cond.includes("mist") || cond.includes("haze")
// const isSnowy = cond.includes("snow")
// const isClear = cond.includes("clear")

//   return (
//     <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
//       {/* 1. Atmospheric Depth Base */}
//       <div className={`absolute inset-0 transition-colors duration-[4000ms] ease-in-out ${
//         isNight ? 'bg-slate-950' : 'bg-transparent'
//       }`} />

//       {/* 2. ✨ Celestial Bodies & Sunlight Rays */}
//       <AnimatePresence>
//         {!isNight && isClear && (
//           <motion.div
//             initial={{ opacity: 0, scale: 1.2 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-yellow-400/10 blur-[150px] rounded-full mix-blend-soft-light"
//           />
//         )}
//         {isNight && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.4 }}
//             className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-100/20 blur-[120px] rounded-full mix-blend-screen"
//           />
//         )}
//       </AnimatePresence>

//       {/* 3. ✨ Twinkling Starfield */}
//       {isNight && (
//         <div className="absolute inset-0">
//           {[...Array(80)].map((_, i) => (
//             <motion.div
//               key={`star-${i}`}
//               animate={{ 
//                 opacity: [0.1, 0.8, 0.1],
//                 scale: [1, 1.2, 1]
//               }}
//               transition={{ 
//                 duration: 3 + Math.random() * 4, 
//                 repeat: Infinity, 
//                 delay: Math.random() * 5 
//               }}
//               className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 2}px`,
//                 height: `${Math.random() * 2}px`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       {/* 4. ☁️ Volumetric Floating Clouds */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(isCloudy ? 12 : 6)].map((_, i) => (
//           <motion.div
//             key={`cloud-${i}`}
//             initial={{ x: "-120%" }}
//             animate={{ x: "120vw" }}
//             transition={{
//               duration: isStormy ? 30 : 120 + i * 15,
//               repeat: Infinity,
//               ease: "linear",
//               delay: -i * 25,
//             }}
//             className={`absolute blur-[90px] rounded-full mix-blend-screen transition-colors duration-[3000ms] ${
//               isStormy ? "bg-slate-800/60" : isNight ? "bg-slate-500/20" : "bg-white/30"
//             }`}
//             style={{
//               top: `${(i * 15) % 85}%`,
//               width: `${400 + Math.random() * 600}px`,
//               height: `${200 + Math.random() * 200}px`,
//               opacity: isClear ? 0.2 : 0.6,
//             }}
//           />
//         ))}
//       </div>

//       {/* 5. ⛈️ Kinetic Lightning */}
//       {isStormy && (
//         <motion.div
//           animate={{ 
//             opacity: [0, 0, 0.8, 0, 0.4, 0, 0],
//             backgroundColor: ["transparent", "transparent", "#fff", "transparent", "#e0e7ff", "transparent", "transparent"]
//           }}
//           transition={{ 
//             duration: 7, 
//             repeat: Infinity, 
//             times: [0, 0.9, 0.91, 0.92, 0.93, 0.95, 1] 
//           }}
//           className="absolute inset-0 z-[2] mix-blend-overlay"
//         />
//       )}

//       {/* 6. 🌧️ Falling Particles (Rain/Snow) */}
//       {(isRainy || isSnowy || isStormy) && (
//         <div className="absolute inset-0 z-[3]">
//           {[...Array(isSnowy ? 60 : 120)].map((_, i) => (
//             <div
//               key={`particle-${i}`}
//               className={`absolute ${isSnowy ? 'bg-white rounded-full' : 'bg-blue-100/40'}`}
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: "-10%",
//                 width: isSnowy ? `${Math.random() * 6 + 2}px` : "1px",
//                 height: isSnowy ? `${Math.random() * 6 + 2}px` : `${Math.random() * 60 + 40}px`,
//                 filter: isSnowy ? "blur(2px)" : "none",
//                 animation: `fall ${isSnowy ? 6 + Math.random() * 6 : 0.7 + Math.random() * 0.4}s linear infinite`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 opacity: Math.random() * 0.5 + 0.2,
//               }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const weatherThemes = {
//   Clear: { day: "from-[#1e40af] via-[#3b82f6] to-[#60a5fa]", night: "from-[#020617] via-[#0f172a] to-[#1e293b]" },
//   Clouds: { day: "from-[#475569] via-[#94a3b8] to-[#cbd5e1]", night: "from-[#0f172a] via-[#1e293b] to-[#334155]" },
//   Rain: { day: "from-[#1e293b] via-[#334155] to-[#475569]", night: "from-[#020617] via-[#001e3c] to-[#020617]" },
//   Snow: { day: "from-[#e2e8f0] via-[#f8fafc] to-[#e2e8f0]", night: "from-[#1e293b] via-[#334155] to-[#1e293b]" },
//   Default: { day: "from-[#0ea5e9] to-[#38bdf8]", night: "from-[#020617] to-[#1e293b]" }
// };

// function MainLayout({ children }) {
//   const [weather, setWeather] = useState(null);
//   const [unit, setUnit] = useState("metric");
//   const [loading, setLoading] = useState(true);

//   const fetchWeather = async (city) => {
//     try {
//       setLoading(true);
//       const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
//       const geoData = await geoRes.json();
//       if (geoData.length > 0) {
//         const { lat, lon } = geoData[0];
//         const [w, f, a] = await Promise.all([
//           getCurrentWeather(lat, lon, unit), 
//           getForecast(lat, lon, unit), 
//           getAirQuality(lat, lon)
//         ]);
//         setWeather({ ...formatCurrentWeather(w), forecast: f.list, airQuality: a });
//       }
//     } catch (e) { 
//       console.error("Atmospheric fetch error:", e); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

// useEffect(() => {

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const lat = position.coords.latitude
//       const lon = position.coords.longitude

//       fetchWeatherByCoords(lat, lon)
//     },
//     () => {
//       fetchWeather("Dehradun")
//     }
//   )

// }, [unit])



// const fetchWeatherByCoords = async (lat, lon) => {
//   try {

//     setLoading(true)

//     const [w, f, a] = await Promise.all([
//       getCurrentWeather(lat, lon, unit),
//       getForecast(lat, lon, unit),
//       getAirQuality(lat, lon)
//     ])

//     setWeather({
//       ...formatCurrentWeather(w),
//       forecast: f.list,
//       airQuality: a
//     })

//   } catch (e) {
//     console.error(e)
//   } finally {
//     setLoading(false)
//   }
// }

//   const isNight = useMemo(() => {
//     if (!weather) return false;
//     const now = Math.floor(Date.now() / 1000);
//     return now < weather.sunrise || now > weather.sunset;
//   }, [weather]);

//   const theme = weatherThemes[weather?.condition] || weatherThemes.Default;

//   return (
//     <div className={`relative min-h-screen w-full font-['Outfit'] overflow-hidden transition-all duration-[3000ms] bg-gradient-to-br ${isNight ? theme.night : theme.day}`}>
      
//       {/* 🌍 Environment Engine */}
//       <WeatherScene condition={weather?.condition} isNight={isNight} />

//       {/* 🎬 Cinematic Lens Effects */}
//       <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
//       <div className="fixed inset-0 pointer-events-none z-[2] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

//       {/* 📐 UI Layer */}
//       <div className="relative z-10 flex flex-col min-h-screen">
//         <header className="sticky top-0 z-[100] border-b border-white/10 bg-white/5 backdrop-blur-[40px]">
//           <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center">
//             <Navbar onSearch={fetchWeather} currentCity={weather?.city} unit={unit} setUnit={setUnit} isNight={isNight} />
//           </div>
//         </header>

//         <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10">
//           <AnimatePresence mode="wait">
//             {!loading ? (
//               <motion.div
//                 key={weather?.city || 'content'}
//                 initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
//                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                 exit={{ opacity: 0, y: -20, filter: "blur(15px)" }}
//                 transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
//               >
//                 {React.cloneElement(children, { 
//                   weather, 
//                   forecast: weather?.forecast,
//                   airQuality: weather?.airQuality,
//                   isNight, 
//                   onSearch: fetchWeather 
//                 })}
//               </motion.div>
//             ) : (
//               <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
//                 <div className="relative">
//                    <motion.div 
//                     animate={{ rotate: 360 }} 
//                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
//                     className="w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-full" 
//                   />
//                   <motion.div 
//                     animate={{ rotate: -360 }} 
//                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
//                     className="absolute inset-2 border-b-2 border-l-2 border-white/40 rounded-full" 
//                   />
//                 </div>
//                 <p className="text-white/60 tracking-[0.5em] text-[11px] uppercase font-medium">Calibrating Environment</p>
//               </div>
//             )}
//           </AnimatePresence>
//         </main>
        
//         <Footer />
//       </div>

//       <style jsx global>{`
//         @keyframes fall {
//           0% { transform: translateY(-15vh) translateX(0) rotate(0deg); opacity: 0; }
//           10% { opacity: 0.8; }
//           90% { opacity: 0.8; }
//           100% { transform: translateY(115vh) translateX(30px) rotate(10deg); opacity: 0; }
//         }

//         .glass-card {
//           background: rgba(255, 255, 255, 0.04);
//           backdrop-filter: blur(32px) saturate(180%);
//           -webkit-backdrop-filter: blur(32px) saturate(180%);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//           border-top-color: rgba(255, 255, 255, 0.15);
//           border-left-color: rgba(255, 255, 255, 0.15);
//           box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
//           border-radius: 28px;
//           transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .glass-card:hover {
//           background: rgba(255, 255, 255, 0.08);
//           border-color: rgba(255, 255, 255, 0.2);
//           transform: translateY(-6px) scale(1.005);
//           box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
//         }

//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { 
//           background: rgba(255, 255, 255, 0.1); 
//           border-radius: 10px;
//           backdrop-filter: blur(10px);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default MainLayout;






import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import {
  getCurrentWeather,
  getForecast,
  getAirQuality
} from "../services/weatherApi";

import { formatCurrentWeather } from "../utils/helpers";


// 🌤 WEATHER ENVIRONMENT ENGINE
const WeatherScene = ({ condition, isNight }) => {

  const cond = (condition || "").toLowerCase()

  const isRain = cond.includes("rain") || cond.includes("drizzle")
  const isStorm = cond.includes("thunder")
  const isCloud = cond.includes("cloud") || cond.includes("mist") || cond.includes("haze")
  const isSnow = cond.includes("snow")
  const isClear = cond.includes("clear")


  return (

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">


      {/* ☀ SUN GLOW (day only) */}
      {!isNight && isClear && (
        <motion.div
          animate={{ y:[0,30,0] }}
          transition={{ duration:20, repeat:Infinity }}
          className="absolute top-10 right-[15%] w-[120px] h-[120px] rounded-full 
          bg-yellow-300/40 blur-[80px]"
        />
      )}



      {/* 🌙 MOON GLOW */}
      {isNight && (
        <div className="absolute top-16 right-[18%] w-[90px] h-[90px] 
        rounded-full bg-blue-200/30 blur-[60px]" />
      )}



      {/* 🌫 ATMOSPHERIC LIGHT */}
      {!isNight && (
        <div className="absolute inset-x-0 top-0 h-[35vh] opacity-30
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_70%)]"/>
      )}



      {/* ⭐ STAR FIELD */}
      {isNight && !isRain && !isStorm && (
        <>
          {[...Array(140)].map((_,i)=>(
            <motion.div
              key={i}
              animate={{ opacity:[0.2,1,0.2] }}
              transition={{
                duration:2+Math.random()*3,
                repeat:Infinity
              }}
              className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"
              style={{
                top:`${Math.random()*100}%`,
                left:`${Math.random()*100}%`,
                width:`${Math.random()*2+1}px`,
                height:`${Math.random()*2+1}px`
              }}
            />
          ))}
        </>
      )}



      {/* ☁ CLOUD LAYER 1 */}
      {(isCloud || isClear) && (
        <>
          {[...Array(4)].map((_,i)=>(
            <motion.div
              key={i}
              animate={{ x:["-30%","120%"] }}
              transition={{
                duration:120 + i*30,
                repeat:Infinity,
                ease:"linear"
              }}
              className="absolute bg-white/40 rounded-full blur-[50px]"
              style={{
                top:`${15 + i*10}%`,
                width:`${450 + Math.random()*200}px`,
                height:`${180 + Math.random()*90}px`
              }}
            />
          ))}
        </>
      )}



      {/* ☁ CLOUD LAYER 2 (parallax slow) */}
      {isCloud && (
        <>
          {[...Array(3)].map((_,i)=>(
            <motion.div
              key={i}
              animate={{ x:["-20%","110%"] }}
              transition={{
                duration:200 + i*40,
                repeat:Infinity,
                ease:"linear"
              }}
              className="absolute bg-gray-300/50 rounded-full blur-[60px]"
              style={{
                top:`${40 + i*10}%`,
                width:`${600 + Math.random()*200}px`,
                height:`${250 + Math.random()*100}px`
              }}
            />
          ))}
        </>
      )}



      {/* 🌧 RAIN */}
      {(isRain || isStorm) && (
        <>
          {[...Array(120)].map((_,i)=>(
            <div
              key={i}
              className="absolute"
              style={{
                left:`${Math.random()*100}%`,
                top:"-10%",
                transform:"rotate(18deg)",
                animation:`rain ${0.6+Math.random()*0.3}s linear infinite`,
                width:"2px",
                height:"80px",
                background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.7))",
              }}
            />
          ))}
        </>
      )}



      {/* ⚡ STORM LIGHTNING */}
      {isStorm && (
        <motion.div
          animate={{ opacity:[0,0,0.7,0] }}
          transition={{
            duration:4,
            repeat:Infinity
          }}
          className="absolute inset-0 bg-white"
        />
      )}



    </div>

  )
}


// 🌈 WEATHER BACKGROUND THEMES
const weatherThemes = {

  Clear:{
    day:"from-sky-400 via-sky-500 to-blue-600",
    night:"from-[#020617] via-[#0b1220] to-black"
  },

  Clouds:{
    day:"from-gray-300 via-gray-400 to-gray-500",
    night:"from-[#111827] via-[#1f2937] to-black"
  },

  Rain:{
    day:"from-slate-500 via-slate-700 to-slate-900",
    night:"from-[#020617] via-[#0f172a] to-black"
  },

  Default:{
    day:"from-sky-400 via-blue-500 to-blue-600",
    night:"from-[#020617] via-[#0b1220] to-black"
  }

}


function MainLayout({ children }) {

  const [weather,setWeather] = useState(null)
  const [unit,setUnit] = useState("metric")
  const [loading,setLoading] = useState(true)
  const [currentCity,setCurrentCity] = useState(null)


  // FETCH WEATHER BY COORDS
  const fetchWeatherByCoords = async (lat,lon)=>{
    try{

      setLoading(true)

      const [w,f,a] = await Promise.all([
        getCurrentWeather(lat,lon,unit),
        getForecast(lat,lon,unit),
        getAirQuality(lat,lon)
      ])

      setWeather({
        ...formatCurrentWeather(w),
        forecast:f.list,
        airQuality:a
      })

    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }


  // FETCH WEATHER BY CITY
  const fetchWeather = async (city)=>{
    setCurrentCity(city)
    const geo = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    )

    const data = await geo.json()

    if(data.length){
      fetchWeatherByCoords(data[0].lat,data[0].lon)
    }

  }


  // AUTO LOCATION
  useEffect(()=>{

  if(currentCity){
    fetchWeather(currentCity)
    return
  }

  navigator.geolocation.getCurrentPosition(

    (pos)=>{
      fetchWeatherByCoords(
        pos.coords.latitude,
        pos.coords.longitude
      )
    },

    ()=>{
      fetchWeather("Delhi")
    }

  )

},[unit])


  // DAY / NIGHT
  const isNight = useMemo(()=>{

    if(!weather) return false

    const now = Math.floor(Date.now()/1000)

    return now < weather.sunrise || now > weather.sunset

  },[weather])


  const theme = weatherThemes[weather?.condition] || weatherThemes.Default


  return (

    <div className={`relative min-h-screen bg-gradient-to-br ${isNight ? theme.night : theme.day} transition-all duration-[2000ms]`}>

      <WeatherScene condition={weather?.condition} isNight={isNight}/>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">

        <header className="sticky top-0 backdrop-blur-xl bg-black/20 border-b border-white/10 z-50">
          <Navbar
            onSearch={fetchWeather}
            currentCity={weather?.city}
            unit={unit}
            setUnit={setUnit}
          />
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-6 py-10">

          <AnimatePresence mode="wait">

            {!loading ? (

              <motion.div
                key={weather?.city}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0}}
                transition={{duration:0.6}}
              >
                {React.cloneElement(children,{
                  weather,
                  forecast:weather?.forecast,
                  airQuality:weather?.airQuality,
                  isNight,
                  onSearch:fetchWeather
                })}
              </motion.div>

            ) : (

              <div className="h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"/>
              </div>

            )}

          </AnimatePresence>

        </main>

        <Footer/>

      </div>


      {/* RAIN ANIMATION */}
      <style>{`
        @keyframes rain {
          0% { transform:translateY(-10vh) rotate(20deg); opacity:0 }
          10%{opacity:1}
          100%{ transform:translateY(110vh) rotate(20deg); opacity:0 }
        }
      `}</style>

    </div>

  )
}

export default MainLayout