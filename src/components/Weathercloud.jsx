import React from 'react';

const WeatherCard = ({ data }) => {
  const temp = Math.round(data.main.temp);
  const condition = data.weather[0].main;

  // دالة لجلب النصيحة والصورة بناءً على درجة الحرارة والجو
  const getSafetyGuide = (temp, condition) => {
    if (temp <= 10) return {
      advice: "الجو بارد جداً! يجب ارتداء ملابس ثقيلة (معطف، قفازات). حافظ على دفء جسمك وتجنب البقاء طويلاً في الخارج.",
      image: "https://images.unsplash.com/photo-1483354483454-4cd359948304?auto=format&fit=crop&w=600",
      status: "برودة شديدة"
    };
    if (temp > 10 && temp <= 20) return {
      advice: "الجو مائل للبرودة. نوصي بارتداء سترة خفيفة أو ملابس خريفية. مناسب للمشي السريع.",
      image: "https://images.unsplash.com/photo-1517495306984-f84210f9daa8?auto=format&fit=crop&w=600",
      status: "أجواء معتدلة مائلة للبرودة"
    };
    if (temp > 20 && temp <= 30) return {
      advice: "الجو رائع ومعتدل. ملابس قطنية خفيفة ستكون مثالية. لا تنسَ شرب الماء بانتظام.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600",
      status: "جو مثالي"
    };
    return {
      advice: "تحذير: حرارة مرتفعة! ارتدِ ملابس خفيفة وبيضاء، استخدم واقي شمس، واشرب الكثير من السوائل لتجنب الإجهاد الحراري.",
      image: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=600",
      status: "حرارة عالية"
    };
  };

  const guide = getSafetyGuide(temp, condition);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/20 text-white shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* الجزء العلوي: البيانات الأساسية */}
        <div className="space-y-4">
          <h2 className="text-5xl font-black mb-2">{data.name}</h2>
          <div className="flex items-center gap-4">
            <span className="text-8xl font-light">{temp}°</span>
            <div className="text-right">
              <p className="text-2xl font-medium">{data.weather[0].description}</p>
              <p className="text-white/60">الإحساس الحقيقي: {Math.round(data.main.feels_like)}°</p>
            </div>
          </div>
        </div>

        {/* الجزء الجديد: قسم السلامة والصورة الحية */}
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <img 
                src={guide.image} 
                alt="Weather Condition" 
                className="w-full h-48 object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <span className="bg-red-500/80 text-[10px] w-fit px-2 py-0.5 rounded-full mb-2 animate-pulse">دليل السلامة</span>
                <p className="text-xs font-bold leading-relaxed">
                   <span className="text-yellow-400">نصيحة اليوم: </span> {guide.advice}
                </p>
            </div>
        </div>
      </div>

      {/* شريط تفاصيل إضافية */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/40 text-xs">الرطوبة</p>
          <p className="font-bold text-xl">{data.main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-white/40 text-xs">الرياح</p>
          <p className="font-bold text-xl">{data.wind.speed} كم/س</p>
        </div>
        <div className="text-center">
          <p className="text-white/40 text-xs">الضغط</p>
          <p className="font-bold text-xl">{data.main.pressure}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
