import Footer from "./Footer";
import Header from "./Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between">
      <Header />

      <div className="w-full grow">{children}</div>

      <Footer />
    </div>
  );
}
