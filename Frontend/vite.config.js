// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This intercepts any request starting with /api
      '/api': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
})