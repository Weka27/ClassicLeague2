import React, { ReactNode } from "react";
import RetroNav from "./RetroNav";

export default function RetroLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-eslblack text-eslgrey font-sans">
      <RetroNav />
      <main className="max-w-6xl mx-auto p-6">{children}</main>
      <footer className="text-center text-eslgrey text-sm mt-12 mb-6">
        &copy; 2025 Retro ESL Classic League
      </footer>
    </div>
  );
}
