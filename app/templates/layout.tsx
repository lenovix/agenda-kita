import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Template Undangan - AgendaKita",
  description: "Pilih template undangan pernikahan digital",
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}