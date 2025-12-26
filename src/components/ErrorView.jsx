import React from 'react';

const ErrorView = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-2xl mt-8 animate-bounce-short">
      {/* أيقونة الخطأ */}
      <div className="bg-red-100 p-3 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-bold text-red-800 mb-2">عذراً، حدث خطأ ما</h3>
      <p className="text-red-600 text-center">
        {errorMessage || "لم نتمكن من العثور على المدينة التي تبحث عنها. يرجى التأكد من الاسم والمحاولة مرة أخرى."}
      </p>
      
      <button 
        onClick={() => window.location.reload()} 
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
      >
        إعادة المحاولة
      </button>
    </div>
  );
};

export default ErrorView;