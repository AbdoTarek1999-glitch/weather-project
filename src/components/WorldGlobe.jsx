import React from "react";

const WorldGlobe = ({ coordinates }) => {
  // استخدام خريطة تفاعلية كروية من Windy أو Google Earth لمظهر احترافي
  const lat = coordinates?.lat || 0;
  const lon = coordinates?.lon || 0;

  return (
    <div className="w-full h-80 bg-black/20 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 overflow-hidden relative shadow-2xl group">
      <div className="absolute top-4 right-6 z-10 flex items-center gap-2">
         <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
         <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">3D Geo-Position</span>
      </div>

      {/* استخدام عرض كروي تفاعلي خفيف */}
      <iframe
        title="3D Globe"
        width="100%"
        height="100%"
        src={`https://www.windy.com/-Satellite-satellite?satellite,${lat},${lon},5,p:off,m:6aPadZ`}
        className="opacity-80 grayscale-[0.3] contrast-125 scale-110"
        style={{ border: 'none' }}
      ></iframe>

      {/* طبقة حماية زجاجية فوق الخريطة لمنع التداخل مع التمرير */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 rounded-[2.5rem]"></div>
    </div>
  );
};

export default WorldGlobe;