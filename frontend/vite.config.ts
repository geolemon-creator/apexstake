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
      '78ad-2a02-3037-311-d8a4-c477-1166-6ea5-f606.ngrok-free.app',
    ],
  },
});
