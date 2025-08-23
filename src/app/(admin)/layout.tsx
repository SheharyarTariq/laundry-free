import Header from "@/components/common/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
}