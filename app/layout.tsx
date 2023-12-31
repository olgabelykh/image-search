import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const font = localFont({
  src: './SF_Pro_Display_Regular.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Image Search',
  description: 'Test Case',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children} </body>
    </html>
  );
}
