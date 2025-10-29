"use client";
import React from "react";

type GenericCardItem = {
  label: string;
  value: React.ReactNode;
  colSpan?: number; // 1..columns
};

export default function GenericCard({
  title,
  headerLeft,
  headerRight,
  items,
  columns = 2,
  className = "",
}: Readonly<{
  title?: string | React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  items: GenericCardItem[];
  columns?: number;
  className?: string;
}>) {
  const gridColsClass = `md:grid-cols-${columns}` as const;

  return (
    <div className={`w-full ${className}`}>
      {(title || headerLeft || headerRight) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {headerLeft}
            {title && (
              <h2 className="text-2xl font-bold">
                {typeof title === "string" ? title : title}
              </h2>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>
      )}

      <div className="rounded-xl border border-icy-mist shadow-custom-subtle bg-white">
        <div className={`grid grid-cols-1 ${gridColsClass} gap-0`}>
          {items.map((item, index) => {
            const colSpan = Math.min(Math.max(item.colSpan ?? 1, 1), columns);
            const spanClass = colSpan === columns ? ("md:col-span-" + columns) : (`md:col-span-${colSpan}`);
            return (
              <div
                key={index}
                className={`p-4 border-b md:border-b-0 md:border-r border-icy-mist ${spanClass}`}
              >
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm font-medium break-words whitespace-pre-wrap">{item.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


