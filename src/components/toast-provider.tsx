 "use client";
import { Toaster } from "react-hot-toast";
export function ToastProvider(){return <Toaster position="top-center" toastOptions={{duration:3200,style:{borderRadius:"12px",background:"#203f2b",color:"#fff",fontSize:"14px"}}}/>;}