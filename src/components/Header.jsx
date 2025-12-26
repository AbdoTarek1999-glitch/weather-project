import React, { useState } from 'react';

const Header = ({ onHomeClick }) => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="w-full py-5 px-6 bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* الشعار */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <span className="text-3xl drop-shadow-md">🌤️</span>
            <h1 className="text-2xl font-black text-white tracking-tighter drop-shadow-sm">
              WEATHER<span className="text-blue-300">DASH</span>
            </h1>
          </div>

          {/* أزرار التنقل */}
          <nav>
            <ul className="flex gap-6 text-white font-bold text-sm md:text-base">
              <li 
                onClick={onHomeClick}
                className="hover:text-blue-300 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                الرئيسية
              </li>
              <li 
                onClick={() => setShowAbout(true)}
                className="hover:text-blue-300 cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                عن التطبيق
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* نافذة "عن التطبيق" المنبثقة (About Modal) */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 p-8 rounded-[2rem] max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-4 left-4 text-white/50 hover:text-white text-2xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-4 text-right">عن WeatherDash</h2>
            <p className="text-gray-300 leading-relaxed text-right mb-6">
              هذا التطبيق هو مشروع تخرج متقدم تم بناؤه بواسطة <span className="text-blue-400 font-bold">عبده طارق</span>. 
              يعتمد التطبيق على تقنيات React و Tailwind CSS لجلب بيانات الطقس الحية والتوقعات لـ 5 أيام بدقة عالية.
            </p>
            <button 
              onClick={() => setShowAbout(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;