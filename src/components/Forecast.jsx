import React from 'react';

const Forecast = ({ days }) => {
    return (
        <div className="mt-10 w-full border-t border-white/20 pt-8">
            <h3 className="text-white text-lg font-bold mb-6 text-right pr-2 border-r-4 border-blue-400">
                توقعات الأيام القادمة
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {days.map((day, index) => (
                    <div 
                        key={index} 
                        className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <p className="text-blue-100 text-xs font-bold mb-2">
                            {new Date(day.dt * 1000).toLocaleDateString('ar-EG', { weekday: 'short' })}
                        </p>
                        <img 
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                            alt="weather icon" 
                            className="w-12 h-12 mx-auto drop-shadow-md"
                        />
                        <p className="text-white font-black text-xl mt-1">{Math.round(day.main.temp)}°</p>
                        <p className="text-white/60 text-[10px] mt-1 truncate px-1">
                            {day.weather[0].description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;