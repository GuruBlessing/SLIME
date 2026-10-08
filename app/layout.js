import './globals.css';

export const metadata = {
  title: 'Slime — Where editors compete',
  description: 'Compete in editing challenges and get ranked on skill, not followers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}