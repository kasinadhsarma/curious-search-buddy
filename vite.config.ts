import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Keep existing react import
import path from "path";
import { componentTagger } from "lovable-tagger"; // Keep existing tagger import

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({ // Keep mode for conditional plugin loading
  server: {
    host: "::", // Keep existing host
    port: 8080, // Keep existing port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Backend server address
        changeOrigin: true,
        // No rewrite needed as backend paths are /api/v1/...
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && // Keep conditional tagger
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
