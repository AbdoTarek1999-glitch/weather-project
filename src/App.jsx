import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import WorldGlobe from './components/WorldGlobe'; 
import ErrorView from './components/ErrorView';
import LoadingSpinner from './components/LoadingSpinner';
import ClimateAlerts from './components/ClimateAlerts'; 
import WeatherMigration from './components/WeatherMigration';

const API_KEY = "b0141aa0017bb1fe2190a7fbe00118a8";
const BASE_URL = "https://api.openweathermap.org/data/2.5"; 

// قاموس الترجمة لجميع نصوص الصفحة الرئيسية
const translations = {
    ar: {
        searchPlaceholder: "ابحث عن مدينة عالمية...",
        liveRadar: "رادار المراقبة المباشر",
        errorFound: "عذراً، لم نتمكن من الوصول للمدينة",
        langName: "English",
        loading: "جاري تحليل البيانات الجوية..."
    },
    en: {
        searchPlaceholder: "Search global cities...",
        liveRadar: "LIVE RADAR ANALYTICS",
        errorFound: "Sorry, city data unavailable",
        langName: "العربية",
        loading: "Analyzing atmospheric data..."
    }
};

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState('Cairo');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bgClass, setBgClass] = useState('from-slate-900 to-black');
    
    // نظام اللغات
    const [lang, setLang] = useState('ar');
    const t = translations[lang];

    const toggleLanguage = () => {
        setLang(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const fetchWeatherData = async (cityName) => {
        if (!cityName) return;
        setIsLoading(true);
        setError(null);

        try {
            // طلب بيانات الطقس باللغة المختارة
            const currentRes = await fetch(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=${lang}`);
            if (!currentRes.ok) throw new Error(t.errorFound);
            const currentData = await currentRes.json();

            const forecastRes = await fetch(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=${lang}`);
            const fData = await forecastRes.json();
            const dailyData = fData.list.filter((_, index) => index % 8 === 0);

            setWeatherData(currentData);
            setForecastData(dailyData);

            // تحديث الخلفية بناءً على الطقس
            const mainWeather = currentData.weather[0].main.toLowerCase();
            if (mainWeather.includes('clear')) setBgClass('from-orange-500/20 to-blue-900');
            else if (mainWeather.includes('rain')) setBgClass('from-blue-900 to-gray-900');
            else if (mainWeather.includes('cloud')) setBgClass('from-gray-700 to-slate-900');
            else setBgClass('from-blue-600 to-indigo-950');

        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city, lang]);

    return (
        <div 
            className={`min-h-screen w-full flex flex-col bg-gradient-to-br ${bgClass} transition-all duration-1000 ease-in-out font-sans overflow-x-hidden`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
            {/* الهيدر مع تمرير وظيفة تغيير اللغة */}
            <Header 
                onHomeClick={() => setCity('Cairo')} 
                onLangToggle={toggleLanguage} 
                currentLangName={t.langName} 
            />

            <main className="flex-grow w-full py-16 px-6 md:px-12">
                
                <div className="w-full max-w-[1700px] mx-auto bg-white/5 backdrop-blur-3xl rounded-[5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] p-10 md:p-20 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[150px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[150px] pointer-events-none"></div>

                    <SearchBar onSearch={(term) => setCity(term)} placeholder={t.searchPlaceholder} />
                    
                    <div className="mt-24">
                        {isLoading && (
                            <div className="flex flex-col items-center gap-4">
                                <LoadingSpinner />
                                <p className="text-white/50 animate-pulse">{t.loading}</p>
                            </div>
                        )}

                        {error && !isLoading && <ErrorView errorMessage={error} />}
                        
                        {weatherData && !isLoading && !error && (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 animate-in fade-in zoom-in-95 duration-1000">
                                
                                {/* الجانب الأول: البيانات المناخية */}
                                <div className="space-y-32"> 
                                    <WeatherCard data={weatherData} lang={lang} />
                                    
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                    
                                    <Forecast days={forecastData} lang={lang} />
                                    
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                    
                                    <ClimateAlerts lang={lang} />
                                </div>

                                {/* الجانب الثاني: المراقبة البصرية والخرائط */}
                                <div className="space-y-32">
                                    <WorldGlobe coordinates={weatherData.coord} />
                                    
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                    
                                    <WeatherMigration data={weatherData} lang={lang} />
                                    
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                    
                                    {/* قسم الرادار المطور */}
                                    <div className="group relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[3.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                        <div className="relative w-full h-[500px] bg-black/60 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl">
                                            <div className="absolute top-8 left-8 z-10 flex items-center gap-3 bg-blue-600 text-white text-[11px] px-5 py-2 rounded-full font-black tracking-widest shadow-xl">
                                                <span className="relative flex h-2 w-2">
                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                                </span>
                                                {t.liveRadar}
                                            </div>
                                            <iframe 
                                                title="satellite-radar"
                                                width="100%" 
                                                height="100%" 
                                                src={`https://www.rainviewer.com/map.html?loc=${weatherData.coord.lat},${weatherData.coord.lon},6&control=0&map=1&type=1&size=512&o=8&v=1&p=1&v=1`}
                                                style={{ border: 0, filter: 'invert(1) hue-rotate(180deg) brightness(0.8)' }}
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer lang={lang} />
        </div>
    );
}

export default App;
