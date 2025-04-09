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
      'admin.adminbottle.ru',
      'localhost',
      '6d9d-2a02-3037-305-3bdf-1504-1e99-38e6-768e.ngrok-free.app',
    ],
  },
});
