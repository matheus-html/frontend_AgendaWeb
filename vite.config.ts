import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081,
    // <<< ADICIONE O PROXY AQUI DENTRO DO OBJETO 'server' >>>
    proxy: {
      '/agendamento': {
        // MUITO IMPORTANTE: Altere esta URL para o endereço do seu backend!
        target: 'http://localhost:8080',
        changeOrigin: true, // Essencial para o proxy funcionar corretamente
      },
    },
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
