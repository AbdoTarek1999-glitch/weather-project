import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // دالة التعامل مع الإرسال (Submit)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setSearchTerm(''); // مسح الحقل بعد البحث
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="relative group w-full max-w-md mx-auto mb-8"
        >
            {/* حاوية شريط البحث مع تأثير الزجاج والظل الناعم */}
            <div className="flex items-center bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl transition-all duration-300 focus-within:shadow-2xl focus-within:bg-white/50 focus-within:ring-2 focus-within:ring-blue-400/50">
                
                {/* أيقونة البحث الجانبية (SVG) */}
                <div className="pl-4 text-gray-600">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>

                {/* حقل الإدخال الشفاف */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن مدينة (مثلاً: London)..."
                    className="flex-grow p-4 bg-transparent text-gray-800 placeholder-gray-500 font-medium outline-none text-lg w-full"
                />

                {/* زر البحث المتفاعل */}
                <button
                    type="submit"
                    className="mr-2 bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all duration-300 active:scale-95 font-bold shadow-md hover:shadow-blue-500/50"
                >
                    بحث
                </button>
            </div>

            {/* تأثير ضوئي بسيط أسفل الحقل يظهر عند التركيز */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-11/12 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-500"></div>
        </form>
    );
};

export default SearchBar;
