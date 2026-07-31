import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 로컬에서는 vite가, 배포 후에는 CloudFront가 같은 역할을 한다.
    // 덕분에 프론트 코드에서 API 주소를 분기할 필요가 없다.
    proxy: {
      "/api": "http://localhost:3000",
      "/ws": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
  },
});
