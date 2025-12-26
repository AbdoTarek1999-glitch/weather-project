import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto bg-black/20 backdrop-blur-lg border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm opacity-80">
          © 2025 WeatherDash. جميع الحقوق محفوظة لـ <span className="font-bold">عبده طارق</span>.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0 text-xl">
           {/* يمكنك إضافة روابط GitHub أو LinkedIn هنا */}
           <a href="#" className="hover:scale-110 transition">🌐</a>
           <a href="#" className="hover:scale-110 transition">💻</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;