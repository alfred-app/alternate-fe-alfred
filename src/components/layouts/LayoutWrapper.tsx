import Footer from './Footer';
import Header from './Header';
import { Open_Sans, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-open-sans',
});

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between">
      <Header />

      <div className={`w-full grow ${poppins.variable} ${openSans.variable}`}>
        {children}
      </div>

      <Footer />
    </div>
  );
}
