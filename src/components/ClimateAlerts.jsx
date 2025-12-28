import React from 'react';

const alerts = [
  { title: "أعاصير مدارية", icon: "🌪️", risk: "عالي", desc: "تتبع مسارات الرياح الدوارة وتأثيرها على السواحل.", color: "bg-purple-600" },
  { title: "عواصف رعدية", icon: "⚡", risk: "متوسط", desc: "تفريغ كهربائي مفاجئ يؤدي لتوقف الملاحة الجوية.", color: "bg-yellow-600" },
  { title: "موجات حرارية", icon: "🔥", risk: "خطر", desc: "ارتفاع قياسي يؤدي لجفاف التربة وحرائق الغابات.", color: "bg-red-600" },
  { title: "فيضانات مفاجئة", icon: "🌊", risk: "عالي", desc: "تجمعات مياه ناتجة عن أمطار غزيرة في وقت قياسي.", color: "bg-blue-600" }
];

const ClimateAlerts = () => (
  <div className="w-full py-8">
    <h3 className="text-2xl font-black text-white mb-6 border-r-4 border-red-500 pr-4">رصد الظواهر المناخية المتطرفة</h3>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {alerts.map((alert, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] hover:bg-white/10 transition-all group">
          <div className={`w-12 h-12 ${alert.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
            {alert.icon}
          </div>
          <h4 className="text-white font-bold mb-1">{alert.title}</h4>
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">مستوى الخطر: {alert.risk}</span>
          <p className="text-white/60 text-xs mt-2 leading-relaxed">{alert.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ClimateAlerts;
