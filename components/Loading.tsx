'use client';

import { Loader } from "lucide-react";

const Loading = ({ text = "Loading...", className = "py-16" }) => {
  return (    
    <div className={`flex flex-col justify-center items-center ${className}`}>
        <Loader className="w-8 h-8 animate-spin text-violet-500" /> 
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
};

export default Loading;
