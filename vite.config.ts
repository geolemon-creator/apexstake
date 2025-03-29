import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Разрешает принимать запросы с любого хоста
    strictPort: true, // Гарантирует использование указанного порта
    port: 3000,
    cors: {
      origin: '*', // Разрешает запросы со всех доменов
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешенные методы
    },
    allowedHosts: [
      'work.lnx-usr.xyz',
      'localhost',
      'f813-2a02-3037-308-9a0-b501-2df3-f7ae-6510.ngrok-free.app',
    ],
  },
});
