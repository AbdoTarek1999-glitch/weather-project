import React from 'react';

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const { name, main, weather, wind, sys } = data;
    // أيقونة الطقس من المصدر الرسمي
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

    return (
        <div className="text-white animate-in fade-in zoom-in duration-700">
            {/* الجزء العلوي: المدينة والوقت الحالي */}
            <div className="text-center mb-6">
                <h2 className="text-4xl font-black drop-shadow-md">
                    {name}, <span className="text-blue-200">{sys.country}</span>
                </h2>
                <p className="text-sm uppercase tracking-widest opacity-80 mt-1">
                    {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* الجزء الأوسط: درجة الحرارة والأيقونة */}
            <div className="flex flex-col md:flex-row items-center justify-around bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-inner">
                <div className="relative">
                    <img 
                        src={iconUrl} 
                        alt={weather[0].description} 
                        className="w-32 h-32 drop-shadow-2xl" 
                    />
                </div>
                <div className="text-center md:text-left">
                    <div className="text-7xl font-black leading-none flex">
                        {Math.round(main.temp)}
                        <span className="text-3xl mt-2">°C</span>
                    </div>
                    <p className="text-xl capitalize font-medium text-blue-100 mt-2">
                        {weather[0].description}
                    </p>
                </div>
            </div>

            {/* الجزء السفلي: تفاصيل إضافية (Grid) */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-4 space-x-reverse">
                    <span className="text-2xl">💧</span>
                    <div>
                        <p className="text-xs opacity-70">الرطوبة</p>
                        <p className="text-lg font-bold">{main.humidity}%</p>
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center space-x-4 space-x-reverse">
                    <span className="text-2xl">🚩</span>
                    <div>
                        <p className="text-xs opacity-70">الرياح</p>
                        <p className="text-lg font-bold">{(wind.speed * 3.6).toFixed(1)} كم/س</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;