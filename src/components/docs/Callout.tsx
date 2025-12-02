"use client";

import { Info, AlertTriangle, Lightbulb, CheckCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "tip" | "success";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const styles: Record<CalloutType, { icon: React.ReactNode; bg: string; border: string; iconColor: string }> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    bg: "bg-blue-950/30",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    bg: "bg-yellow-950/30",
    border: "border-yellow-500/30",
    iconColor: "text-yellow-400",
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    bg: "bg-green-950/30",
    border: "border-green-500/30",
    iconColor: "text-green-400",
  },
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    bg: "bg-emerald-950/30",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
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
            <p className={`font-medium ${style.iconColor}`}>{title}</p>
          )}
          <div className="text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

