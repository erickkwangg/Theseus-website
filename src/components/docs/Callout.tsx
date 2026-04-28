"use client";

import { Info, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { icon: React.ReactNode; bg: string; border: string; iconColor: string; titleColor: string }> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-200 dark:border-indigo-400/30",
    iconColor: "text-indigo-600 dark:text-indigo-300",
    titleColor: "text-indigo-900 dark:text-indigo-200",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-300 dark:border-yellow-500/30",
    iconColor: "text-yellow-700 dark:text-yellow-400",
    titleColor: "text-yellow-900 dark:text-yellow-200",
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-300 dark:border-green-500/30",
    iconColor: "text-green-700 dark:text-green-400",
    titleColor: "text-green-900 dark:text-green-200",
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-300 dark:border-emerald-500/30",
    iconColor: "text-emerald-700 dark:text-emerald-400",
    titleColor: "text-emerald-900 dark:text-emerald-200",
  },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-6`}>
      <div className="flex gap-3">
        <div className={`${style.iconColor} shrink-0 mt-0.5`}>
          {style.icon}
        </div>
        <div className="space-y-1">
          {title && (
            <p className={`font-medium ${style.titleColor}`}>{title}</p>
          )}
          <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}




