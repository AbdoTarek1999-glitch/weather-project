import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import WorldGlobe from './components/WorldGlobe'; // المكون الجديد
import ErrorView from './components/ErrorView';
import LoadingSpinner from './components/LoadingSpinner';

const API_KEY = "b0141aa0017bb1fe2190a7fbe00118a8"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState('Cairo');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bgClass, setBgClass] = useState('from-blue-600 to-indigo-900');

    const fetchWeatherData = async (cityName) => {
        if (!cityName) return;
        setIsLoading(true);
        setError(null);

        try {
            // 1. جلب الطقس الحالي
            const currentRes = await fetch(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ar`);
            if (!currentRes.ok) throw new Error("عذراً، لم نتمكن من العثور على هذه المدينة");
            const currentData = await currentRes.json();

            // 2. جلب توقعات الـ 5 أيام
            const forecastRes = await fetch(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=ar`);
            if (!forecastRes.ok) throw new Error("فشل جلب بيانات التوقعات");
            const fData = await forecastRes.json();
            const dailyData = fData.list.filter((_, index) => index % 8 === 0);

            setWeatherData(currentData);
            setForecastData(dailyData);

            // تغيير الخلفية بناءً على الطقس
            const mainWeather = currentData.weather[0].main.toLowerCase();
            if (mainWeather.includes('clear')) setBgClass('from-orange-400 to-red-500');
            else if (mainWeather.includes('rain')) setBgClass('from-blue-800 to-gray-900');
            else if (mainWeather.includes('cloud')) setBgClass('from-slate-500 to-slate-800');
            else setBgClass('from-blue-600 to-indigo-900');

        } catch (err) {
            setError(err.message);
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    return (
        <div className={`min-h-screen w-full flex flex-col bg-gradient-to-br ${bgClass} transition-all duration-1000 ease-in-out font-sans overflow-x-hidden`}>
            
            <Header onHomeClick={() => setCity('Cairo')} />

            <main className="flex-grow flex items-center justify-center p-4 md:p-10 w-full">
                {/* الحاوية الكبيرة المحدثة لعرض عمودين في الشاشات الكبيرة */}
                <div className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-3xl rounded-[3rem] shadow-2xl p-6 md:p-12 border border-white/20">
                    
                    <SearchBar onSearch={(term) => setCity(term)} />
                    
                    <div className="mt-10 min-h-[500px]">
                        {isLoading && <LoadingSpinner />}
                        
                        {error && !isLoading && <ErrorView errorMessage={error} />}
                        
                        {weatherData && !isLoading && !error && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                                
                                {/* العمود الأول: بيانات الطقس */}
                                <div className="space-y-8">
                                    <WeatherCard data={weatherData} />
                                    <Forecast days={forecastData} />
                                </div>

                                {/* العمود الثاني: كوكب الأرض واللقطات المباشرة */}
                                <div className="space-y-8">
                                    {/* مجسم كوكب الأرض */}
                                    <WorldGlobe coordinates={weatherData.coord} />

                                    {/* شاشة القمر الصناعي المباشر */}
                                    <div className="w-full h-72 bg-black/30 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-2xl">
                                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full animate-pulse font-black uppercase tracking-widest">
                                            <span className="w-2 h-2 bg-white rounded-full"></span> LIVE SATELLITE
                                        </div>
                                        <iframe 
                                            title="satellite-view"
                                            width="100%" 
                                            height="100%" 
                                            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d100000!2d${weatherData.coord.lon}!3d${weatherData.coord.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg&maptype=satellite`}
                                            style={{ border: 0, filter: 'brightness(0.8) contrast(1.2)' }}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
