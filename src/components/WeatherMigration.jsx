import React from 'react';

const WeatherMigration = ({ data }) => {
  const windSpeed = data?.wind?.speed || 0;
  
  return (
    <div className="bg-gradient-to-br from-indigo-900/80 to-black/50 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-blue-500/20 mt-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-400 mb-2">مركز تحليل التنقلات الهوائية</h3>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            بناءً على سرعة الرياح الحالية التي تبلغ <span className="text-yellow-400 font-bold">{windSpeed} كم/س</span>، نلاحظ تحرك كتل هوائية من المناطق المجاورة باتجاه <span className="text-blue-300 font-bold">{data.name}</span>.
          </p>
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
            <h4 className="text-xs font-bold text-white/40 uppercase mb-2">توقعات النقل المناخي:</h4>
            <ul className="text-xs text-white/70 space-y-2">
              <li className="flex items-center gap-2">🔹 احتمال نقل أتربة عالقة من الصحاري الغربية خلال 24 ساعة.</li>
              <li className="flex items-center gap-2">🔹 تحرك منخفض جوي قادم من البحر قد يسبب تقلبات مفاجئة.</li>
            </ul>
          </div>
        </div>
        
        {/* رادار تخيلي */}
        <div className="w-40 h-40 relative flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-4 border border-blue-500/40 rounded-full animate-pulse"></div>
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
             <div className="w-1 h-16 bg-blue-400 origin-bottom animate-[spin_4s_linear_infinite]"></div>
          </div>
          <span className="absolute bottom-0 text-[10px] text-blue-400 font-mono">RADAR ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherMigration;
