import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sager Drone',
  description: 'Sager Drone - A Drone for Every Need',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className='flex gap-0'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
