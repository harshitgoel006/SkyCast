import React from 'react';
import WeatherHero from "../components/WeatherHero/WeatherHero";
import HourlyForecast from "../components/HourlyForecast/HourlyForecast";
import WeeklyForecast from "../components/WeeklyForecast/WeeklyForecast";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";
import WeatherChart from "../components/WeatherChart/WeatherChart";
import WeatherMap from "../components/WeatherMap/WeatherMap";
import SunProgress from "../components/SunProgress/SunProgress";
import AirQuality from "../components/AQICard/AQICard";

function Home({ weather, forecast, airQuality }) {
  if (!weather) return <div className="h-screen flex items-center justify-center animate-pulse">Loading SkyCast...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-8">
      
      {/* SECTION 1: MAIN DISPLAY & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Hero Section (7 Columns) */}
        <div className="lg:col-span-8">
          <WeatherHero weather={weather} />
        </div>

        {/* Vital Stats Sidebar (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AirQuality airQuality={airQuality} />
          <SunProgress weather={weather} />
        </div>
      </div>

      {/* SECTION 2: TRENDS & CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bento-tile">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Temperature Trend</h3>
          <WeatherChart forecast={forecast} />
        </div>
        <div className="bento-tile overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Interactive Map</h3>
          <WeatherMap weather={weather} />
        </div>
      </div>

      {/* SECTION 3: FORECASTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hourly (Scrollable) */}
        <div className="lg:col-span-8 bento-tile">
          <HourlyForecast forecast={forecast} />
        </div>
        
        {/* Weekly (Vertical List) */}
        <div className="lg:col-span-4 bento-tile">
          <WeeklyForecast forecast={forecast} />
        </div>
      </div>

      {/* SECTION 4: SMALL DETAILS GRID */}
      <div className="w-full">
        <WeatherDetails weather={weather} />
      </div>

    </div>
  );
}

export default Home;