import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PI Tasks',
  description: 'Sistema de gerenciamento de tarefas acadêmicas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
